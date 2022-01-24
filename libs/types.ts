export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type TdxApiType = "scenicSpot" | "activity" | "restaurant" | "hotel";

export type IntegratedData = {
  type: TdxApiType;
  id: string;
  name: string;
  description: string;
  picture: { url: string; description: string }[];
  city: string;
  location: string;
  address: string;
  position: Coordinate;

  startTime?: string;
  endTime?: string;
  time?: string;
  phone?: string;
  charge?: string;
  websiteUrl?: string;

  disKm?: number;
};

export type IntegratedDataFilter = {
  types: TdxApiType[];
  city?: string;
  position?: Coordinate;
  needPicture?: boolean;
  needValidLocation?: boolean;
  searchTerm?: string;
  searchProperty?: "name" | "description";
  smallestEndDate?: string;
  number?: number;
  orderBy?: "distance" | "shuffle";
};

export function isIntegratedDataFilter(
  query: any
): query is IntegratedDataFilter {
  return (
    Array.isArray(query.types) &&
    query.types.some(
      (type: string) =>
        type === "scenicSpot" ||
        type === "activity" ||
        type === "restaurant" ||
        type === "hotel"
    )
  );
}
