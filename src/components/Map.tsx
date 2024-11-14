"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMapGL, {
  Layer,
  LayerProps,
  MapRef,
  Marker,
  Popup,
  Source,
} from "react-map-gl";
import mapboxgl, { CircleLayer } from "mapbox-gl";
import { SymbolLayer } from "mapbox-gl";
import type { FeatureCollection } from "geojson";
import { Button } from "./ui/button";
import MapTenementInfo from "./MapTenementInfo";
import { DEFAULT_LOCATION, MAPBOX_TOKEN } from "@/constants";
import { ITenement } from "@/types";
import useDebounce from "@/hooks/useDebounce";
import { useTenementMapSearch } from "@/services/tenementApi";
import { useFilterStore } from "@/lib/store";
import "mapbox-gl/dist/mapbox-gl.css";

import IconStreetView from "@/assets/svg/streetview.svg";
import IconRoute from "@/assets/svg/route.svg";
import IconPlus from "@/assets/svg/plus.svg";
import IconMinus from "@/assets/svg/minus.svg";
import IconPointInterest from "@/assets/svg/point-interest.svg";
import IconLayers from "@/assets/svg/layers.svg";
import IconPencil from "@/assets/svg/pencil.svg";

export default function Map({ data }: { data: ITenement[] }) {
  const [viewport, setViewPort] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>({
    ...DEFAULT_LOCATION,
    zoom: 4,
  });
  const mapRef = useRef<MapRef>(null);
  const [tenementInfo, setTenementInfo] = useState<ITenement>();
  const [markers, setMarkers] = useState<ITenement[]>([]);
  const { search, rent } = useFilterStore();
  const debouncedRent = useDebounce(rent, 500);
  const debouncedZoom = useDebounce(viewport.zoom, 500);

  const { data: mapData, isLoading } = useTenementMapSearch(debouncedZoom, {
    rent: debouncedRent,
  });

  useEffect(() => {
    if (!mapData) return;
    setViewPort((v) => ({
      ...v,
      longitude: mapData.pt[0],
      latitude: mapData.pt[1],
    }));
  }, [mapData]);

  useEffect(() => {
    if (!mapRef.current || data.length === 0) return;
    const map = mapRef.current.getMap();

    if (!map) return;

    const coordinates = data.map((v) => v.location);
    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(
      [
        [bounds._ne.lng, bounds._ne.lat],
        [bounds._sw.lng, bounds._sw.lat],
      ],
      { padding: 20 }
    );
    setTimeout(() => {
      const center = map.getCenter();
      setViewPort({
        longitude: center.lng,
        latitude: center.lat,
        zoom: map.getZoom(),
      });
    }, 500);
  }, [data]);

  const zoomIn = () => {
    setViewPort((v) => ({ ...v, zoom: v.zoom + 1 }));
  };

  const zoomOut = () => {
    setViewPort((v) => ({ ...v, zoom: v.zoom > 1 ? v.zoom - 1 : 1 }));
  };

  const tenementMarks = useMemo(
    () =>
      markers.map((tenement, index) => (
        <Marker
          key={`${tenement.id}-${index}`}
          longitude={tenement.location[0]}
          latitude={tenement.location[1]}
        >
          <div
            className="relative px-2 py-1 rounded-full bg-white -translate-x-1/2 -translate-y-full before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:w-0.5 before:h-2 before:bg-white before:-translate-x-1/2 "
            onMouseOver={() => setTenementInfo(tenement)}
          >
            {tenement.unitType === "multiple"
              ? `${tenement.rentRange[0].toLocaleString()} € - ${tenement.rentRange[1].toLocaleString()} €`
              : `${tenement.rent.toLocaleString()} €`}
          </div>
        </Marker>
      )),
    [markers]
  );

  const geojson = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: data.map((v) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: v.location,
          properties: v,
        },
      })),
    } as any;
  }, [data]);

  useEffect(() => {
    if (!mapRef.current || data.length === 0) return;
    const map = mapRef.current.getMap();

    if (!map) return;

    // Get the source
    const myFeatures = map.querySourceFeatures("tenements", {
      filter: ["!", ["has", "point_count"]],
    });

    setMarkers(
      myFeatures
        .map((feature: any) => {
          return data.find(
            (v) =>
              Math.abs(v.location[0] - feature.geometry.coordinates[0]) <
                0.0001 &&
              Math.abs(v.location[1] - feature.geometry.coordinates[1]) < 0.001
          );
        })
        .filter((v: any) => !!v)
    );
  }, [data, viewport]);

  return (
    <div className="relative w-full h-full">
      <ReactMapGL
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ref={mapRef}
        latitude={viewport?.latitude}
        longitude={viewport?.longitude}
        zoom={viewport?.zoom}
        onViewportChange={setViewPort}
      >
        <Source
          id="tenements"
          type="geojson"
          data={geojson}
          clusterMaxZoom={14}
          cluster
        >
          <Layer
            id="clustered-tenements"
            type="circle"
            source="tenements"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "white",
              "circle-radius": 20,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            }}
          />
          <Layer
            id="clustered-tenements-text"
            type="symbol"
            source="tenements"
            filter={["has", "point_count"]}
            paint={{ "text-color": "black" }}
            layout={{
              "text-field": "{point_count_abbreviated}",
              "text-size": 15,
            }}
          />
        </Source>
        {tenementMarks}
        {tenementInfo && (
          <Popup
            longitude={tenementInfo.location[0]}
            latitude={tenementInfo.location[1]}
            anchor="bottom"
            closeButton={false}
            className="bg-background rounded-xl [&_.mapboxgl-popup-content]:rounded-xl"
            tipSize={0}
            offsetTop={12}
            onClose={() => setTenementInfo(undefined)}
          >
            <MapTenementInfo tenement={tenementInfo} />
          </Popup>
        )}
      </ReactMapGL>
      <div className="absolute left-7 top-7 flex flex-col items-start gap-4">
        <Button variant="secondary" className="px-2" size="lg">
          <IconPointInterest />
          Point of interest
        </Button>
        <Button variant="secondary" className="px-2 rounded-full" size="lg">
          <IconLayers />
        </Button>
        <Button variant="secondary" className="px-2 rounded-full" size="lg">
          <IconPencil />
        </Button>
      </div>
      <div className="absolute left-7 bottom-10 flex gap-2">
        <Button variant="secondary" size="lg" className="text-base px-6">
          Streetview <IconStreetView />
        </Button>
        <Button variant="secondary" size="lg" className="text-base px-6">
          Route <IconRoute />
        </Button>
      </div>
      <div className="absolute right-7 bottom-10 flex flex-col gap-1 bg-neutral-100 p-0.5 rounded">
        <Button
          variant="ghost"
          className="px-2 hover:bg-white"
          onClick={zoomIn}
        >
          <IconPlus />
        </Button>
        <Button
          variant="ghost"
          className="px-2 hover:bg-white"
          onClick={zoomOut}
        >
          <IconMinus />
        </Button>
      </div>
    </div>
  );
}
