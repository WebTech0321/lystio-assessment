"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ITenement } from "@/types";

import IconListing from "@/assets/svg/listing.svg";
import IconGrid from "@/assets/svg/grid.svg";
import IconList from "@/assets/svg/list-ul.svg";
import IconGridOutline from "@/assets/svg/grid-outline.svg";
import IconSort from "@/assets/svg/sort.svg";
import TenementListItem from "./TenementListItem";

export default function TenementListPanel({
  data,
  total,
}: {
  data: ITenement[];
  total?: number;
}) {
  return (
    <div className="w-full flex flex-col bg-background">
      <div className="w-full pt-5 pb-3 px-6 border-b border-black/10">
        <div className="w-full flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2.5">
            <IconListing />
            <h4 className="text-2xl font-medium">Listing around me</h4>
          </div>

          <div className="flex items-center gap-8">
            <Tabs defaultValue="grid2" className="w-[140px]">
              <TabsList className="grid w-full grid-cols-3 gap-2">
                <TabsTrigger value="grid3" className="px-0">
                  <IconGrid />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-0">
                  <IconList />
                </TabsTrigger>
                <TabsTrigger value="grid2" className="px-0">
                  <IconGridOutline />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <div className="text-xs font-medium">Sort by Relevance</div>
              <IconSort />
            </div>
          </div>
        </div>
        <div className="text-xs font-medium ml-12 text-black/60">
          {total?.toLocaleString()} properties
        </div>
      </div>
      <div className="w-full px-10 py-6 grid grid-cols-2 gap-8 overflow-auto">
        {data.map((tenement) => (
          <TenementListItem tenement={tenement} key={tenement.id} />
        ))}
      </div>
    </div>
  );
}
