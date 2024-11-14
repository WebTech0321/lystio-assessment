"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import IconChevronDown from "@/assets/svg/chevron-down.svg";
import IconFilter from "@/assets/svg/filter.svg";
import { Slider } from "./ui/slider";
import { useFilterStore } from "@/lib/store";
import { DualRangeSlider } from "./ui/range-slider";
import { useCallback } from "react";

const filterPlaceholders = [
  "Rent",
  "Apartment",
  "Property type",
  "Beds/baths",
  "Living rooms",
  "Pets",
  "Deposit",
];

const PriceFilter = () => {
  const { minPrice, maxPrice, rent, setPriceRange } = useFilterStore();

  const handleChangePrice = useCallback((v: number[]) => {
    setPriceRange(v[0], v[1]);
  }, []);

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2.5 px-2.5">
        <div className="font-medium">
          Price:{" "}
          <span className="text-black/60">
            {`€${rent[0].toLocaleString()} - €${rent[1].toLocaleString()}`}
          </span>
        </div>
        <IconChevronDown />
      </PopoverTrigger>
      <PopoverContent>
        <DualRangeSlider
          value={rent}
          onValueChange={handleChangePrice}
          min={minPrice}
          max={maxPrice}
        />
      </PopoverContent>
    </Popover>
  );
};

export function FilterBar() {
  return (
    <div className="w-full p-4 flex items-center gap-4 bg-background shadow-filter rounded">
      {filterPlaceholders.map((filter) => (
        <Popover key={filter}>
          <PopoverTrigger className="flex items-center gap-2.5 px-2.5">
            <div className="font-medium">{filter}</div>
            <IconChevronDown />
          </PopoverTrigger>
        </Popover>
      ))}

      <PriceFilter />

      <div className="flex items-center gap-2.5 px-2.5">
        <div className="font-medium">All</div>
        <IconFilter />
      </div>
    </div>
  );
}
