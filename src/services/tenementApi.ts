import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IMapResponse, ITenement } from "@/types";
import { BASE_URL } from "@/constants";

axios.defaults.baseURL = BASE_URL;

export async function getTenementData(
  search: string,
  filter: object,
  page: number = 0,
  perPage: number = 10
): Promise<{ data: ITenement[]; total: number }> {
  try {
    const response = await axios.post("/tenement/search", {
      filter,
      paging: { pageSize: perPage, page: page },
    });

    if (response.status !== 200) {
      throw new Error(`API error: ${response.status}`);
    }

    return { data: response.data.res, total: response.data.paging.totalCount };
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

export async function getTenementMapData(
  zoom: number,
  filter: object
): Promise<IMapResponse> {
  try {
    const response = await axios.post("/tenement/search/map", {
      filter,
      zoom: zoom,
    });

    if (response.status !== 200) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.data?.[0];
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

export const useTenementSearch = (
  search: string,
  filter: object,
  page: number,
  rowsPerPage: number = 10
) => {
  return useQuery({
    queryKey: ["tenement-search", search, filter, page, rowsPerPage],
    queryFn: () => getTenementData(search, filter, page, rowsPerPage),
  });
};

export const useTenementMapSearch = (zoom: number, filter: object) => {
  return useQuery({
    queryKey: ["tenement-map-search", zoom, filter],
    queryFn: () => getTenementMapData(zoom, filter),
  });
};
