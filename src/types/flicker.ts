import { ImagesResult } from "./images";

export type FlickerImage = {
  description: {
    _content: string;
  };
  id: string;
  ownername: string;
  title: string;
  url_l: string;
  url_m: string;
  url_s: string;
};

export type FlickerImages = FlickerImage[];

export type FlickerResult = {
  photos: {
    pages: number;
    photo: FlickerImage[];
  };
};

export type FlickerApiServiceType = {
  find(page: number): Promise<ImagesResult>;
};
