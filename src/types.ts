export interface ITenementMeida {
  id: number;
  type: string;
  name: string;
  cdnUrl: string;
  sort: number;
  title: string;
  bluredDataURL: string;
}

export interface ITenementOwner {
  name: string;
  email: string;
  phone: string;
  description: string | null;
  vat: string | null;
  billingAddress: string | null;
  country: string;
}

export interface IUser {
  id: string;
}

export interface ITenement {
  id: number;
  owner: ITenementOwner | null;
  user: Partial<IUser> | null;
  type: number;
  subType: number;
  unitType: "single" | "multiple";
  rentType: string;
  title: string;
  abstract: string;
  address: string;
  addressDoor: string;
  zip: string;
  city: string;
  country: string;
  size: number;
  sizeRange: [number, number];
  rooms: number;
  roomsRange: [number, number];
  roomsBed: number;
  roomsBedRange: [number, number];
  roomsBath: number;
  roomsBathRange: [number, number];
  rent: number;
  rentRange: [number, number];
  rentUtilities: number;
  rentFull: number;
  rentDeposit: number;
  amenities: number[];
  amenitiesTexts: Object;
  location: [number, number];
  locationReal: [number, number];
  availableFrom: Date;
  highlight: boolean;
  active: boolean;
  verified: boolean;
  deleted: boolean;
  constructionYear: number;
  modernisationYear: number;
  createdAt: string;
  updatedAt: string;
  media: ITenementMeida[];
}

export interface IMapResponse {
  sizeRange: [number, number];
  rentRange: [number, number];
  count: number;
  pt: [number, number];
  ids: number[];
}
