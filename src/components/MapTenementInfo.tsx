"use client";
import { useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ITenement } from "@/types";

import IconCube from "@/assets/svg/cube.svg";
import IconBed from "@/assets/svg/bed.svg";
import IconBath from "@/assets/svg/bath.svg";

import "swiper/css";
import "swiper/css/pagination";

export default function MapTenementInfo({ tenement }: { tenement: ITenement }) {
  const tenementSize = useMemo(() => {
    if (tenement.unitType === "multiple")
      return `${tenement.sizeRange[0].toLocaleString()} - ${tenement.sizeRange[1].toLocaleString()}m2`;
    return `${tenement.size.toLocaleString()}m2`;
  }, [tenement]);

  const tenementRent = useMemo(() => {
    if (tenement.unitType === "multiple")
      return `${tenement.rentRange[0].toLocaleString()} € - ${tenement.rentRange[1].toLocaleString()} €`;
    return `${tenement.rent.toLocaleString()} €`;
  }, [tenement]);

  const tenementBedRooms = useMemo(() => {
    if (tenement.unitType === "multiple")
      return `${tenement.roomsBedRange[0].toLocaleString()} - ${tenement.roomsBedRange[1].toLocaleString()} bed`;
    return `${tenement.roomsBed.toLocaleString()} bed`;
  }, [tenement]);

  const tenementBathRooms = useMemo(() => {
    if (tenement.unitType === "multiple")
      return `${tenement.roomsBathRange[0].toLocaleString()} - ${tenement.roomsBathRange[1].toLocaleString()} bath`;
    return `${tenement.roomsBath.toLocaleString()} bath`;
  }, [tenement]);

  return (
    <div className="w-[320px] flex flex-col gap-4">
      {tenement.media?.length > 0 && (
        <div className="relative w-full h-[198px]">
          <Image
            src={tenement.media[0].cdnUrl}
            alt={tenement.media[0].name}
            blurDataURL={tenement.media[0].bluredDataURL}
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            fill
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="font-semibold text-lg text-black">{tenementRent}</div>
        <div className="text-ellipsis text-nowrap overflow-hidden font-semibold text-xs text-black/60">
          {tenement.address}, {tenement.addressDoor} {tenement.city}
        </div>
        <div className="flex items-center text-xs text-black/60 gap-6">
          <div className="flex items-center gap-2">
            <IconCube />
            {tenementSize}
          </div>
          <div className="flex items-center gap-2">
            <IconBed />
            {tenementBedRooms}
          </div>
          <div className="flex items-center gap-2">
            <IconBath />
            {tenementBathRooms}
          </div>
        </div>
      </div>
    </div>
  );
}
