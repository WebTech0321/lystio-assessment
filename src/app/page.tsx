"use client";
import { useState } from "react";
import { useTenementSearch } from "@/services/tenementApi";
import { useFilterStore } from "@/lib/store";

import { FilterBar } from "@/components/FilterBar";
import Map from "@/components/Map";
import TenementListPanel from "@/components/TenementListPanel";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [page, setPage] = useState(0);
  const { search, rent } = useFilterStore();
  const debouncedRent = useDebounce(rent, 500);
  const { data, isLoading } = useTenementSearch(
    search,
    { rent: debouncedRent },
    page
  );

  return (
    <div className="w-full h-full flex flex-col gap-1 px-5 min-h-0">
      <FilterBar />
      <div className="flex flex-1 gap-1 min-h-0">
        <Map data={data?.data || []} />
        <TenementListPanel data={data?.data || []} total={data?.total} />
      </div>
    </div>
  );
}
