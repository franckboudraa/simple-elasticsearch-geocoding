export interface IGeocodingPost {
  address: string;
  lat: number;
  lng: number;
}

export interface IGeocodingPatch {
  address: string;
  lat: number;
  lng: number;
}

export interface IGeocodingDelete {
  index: string;
  type: string;
  id: string;
}
