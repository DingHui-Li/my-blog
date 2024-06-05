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

type LngLat = {
  lat: number;
  lng: number;
};
