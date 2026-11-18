export type Locale = 'vi' | 'en';

export type LocalizedText = Record<Locale, string>;

export interface ImageAsset {
  src: string;
  alt: LocalizedText;
  sourceUrl: string;
  photographer?: string;
  licenseName: string;
  licenseUrl: string;
  retrievedAt?: string;
  verifiedLocation: boolean;
}

export type ProvinceKind = 'city' | 'province';
export type Region = 'north' | 'central' | 'south';

export interface Province {
  id: string;
  slug: string;
  kind: ProvinceKind;
  region: Region;
  name: LocalizedText;
  summary: LocalizedText;
  description?: LocalizedText;
  image?: ImageAsset;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  iconName: string;
}

export interface TravelogueStop {
  time?: string;
  title: LocalizedText;
  narrative: LocalizedText;
  tip?: LocalizedText;
}

export interface Destination {
  id: string;
  slug: string;
  provinceId: string;
  name: LocalizedText;
  summary: LocalizedText;
  description?: LocalizedText;
  categoryIds: string[];
  images: ImageAsset[];
  featured?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  highlights?: LocalizedText[];
  travelogue?: TravelogueStop[];
  insiderTips?: LocalizedText[];
}
