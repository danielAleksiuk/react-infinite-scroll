type ImagesTypes = {
  small: string;
  medium: string;
  big: string;
};

type User = { name: string };

export type Image = {
  id: string;
  images: ImagesTypes;
  description: string;
  altDescription: string;
  user: User;
};

export type Images = Array<Image>;

export type ImagesResult = {
  isLastPage: boolean;
  images: Images;
  error: string | null;
};
