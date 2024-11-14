"use client";
import { useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ITenement } from "@/types";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import IconBookmark from "@/assets/svg/bookmark.svg";
import IconVerified from "@/assets/svg/verified.svg";
import IconCube from "@/assets/svg/cube.svg";
import IconBed from "@/assets/svg/bed.svg";
import IconBath from "@/assets/svg/bath.svg";

import "swiper/css";
import "swiper/css/pagination";
import { AMENTITIES } from "@/constants";

export default function TenementListItem({
  tenement,
}: {
  tenement: ITenement;
}) {
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

  const tenementAvailableFrom = useMemo(() => {
    const availableFrom = new Date(tenement.availableFrom);
    const now = new Date();
    if (availableFrom < now) return "Immediately";

    return format(availableFrom, "MM-dd-yyyy");
  }, [tenement]);

  return (
    <div className="w-full flex flex-col gap-4 pb-8 bg-background">
      <div className="relative w-full aspect-[9/7] bg-neutral-200 rounded-xl overflow-hidden">
        {tenement.media?.length > 0 && (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {tenement.media.map((media) => (
              <SwiperSlide key={media.id}>
                <Image
                  src={media.cdnUrl}
                  alt={media.name}
                  blurDataURL={media.bluredDataURL}
                  style={{ objectFit: "cover" }}
                  fill
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="absolute left-2 top-2 flex items-center flex-wrap w-3/4 gap-2 z-10">
          {tenement.amenities.map((amentity) => (
            <div
              className="text-xs px-2 py-1 bg-background rounded-full text-nowrap"
              key={amentity}
            >
              {AMENTITIES[amentity]?.title}
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          className="w-7 h-7 rounded-full px-0 absolute right-2 top-2 [&_svg]:size-5 z-10"
        >
          <IconBookmark />
        </Button>
      </div>

      <div className="px-2 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {tenement.verified && (
            <div className="flex items-center text-purple gap-2">
              <IconVerified />
              <div className="text-xs font-medium">Verified</div>
            </div>
          )}
          <div className="text-xs font-medium text-black/60 ms-auto">
            5 days ago
          </div>
        </div>
        <div className="text-ellipsis text-nowrap overflow-hidden font-semibold">
          {tenement.title}
        </div>
        <div className="text-ellipsis text-nowrap overflow-hidden font-semibold text-xs text-black/60">
          {tenement.address}, {tenement.addressDoor} {tenement.city}
        </div>
        <div className="flex items-center text-black/60 gap-6">
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
        <div className="font-semibold text-lg text-black">{tenementRent}</div>
        <div className="text-xs font-medium">
          <span className="text-black/60">Available From: </span>
          {tenementAvailableFrom}
        </div>
      </div>
    </div>
  );
}
