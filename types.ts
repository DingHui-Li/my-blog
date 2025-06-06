export type Topic = {
  _id: string;
  createTime: number;
  name: string;
  cover: string;
  count: number;
};

export type Article = {
  _id: string;
  createTime: number;
  createTimeObj?: Date;
  updateTime: number;
  title: string;
  topics: Array<Topic>;
  type: "article" | "moment" | "photo";
  cover: string;
  htmlContent: string;
  textContent: string;
  desc: string;
  location: Location;
  imgs: Array<string>;
  weather: any;
  movie: Movie;
  onlySelf: boolean;
  sounds: Array<Sound>;
  ai: AI;
  mood: Mood;
};

export type Movie = {
  cover: string;
  link: string;
  title: string;
  rate: string;
  meta: string;
};
export type Location = {
  id: string;
  name: string;
  address: string;
  location: LngLat;
  type: string;
  city: String;
};
export type Sound = {
  src: string;
  duration: number;
};
export type AI = {
  model: string;
  content: string;
};
export type Mood = {
  score: number;
  emoji: string;
  keywords: Array<string>;
  desc: string;
  sentiment: string;
  implicit: string;
  food: string;
};

type LngLat = {
  lat: number;
  lng: number;
};

declare global {
  interface Date {
    format(fmt: string): string;
  }
}
