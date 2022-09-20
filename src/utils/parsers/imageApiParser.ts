import { FlickerImage, FlickerImages } from "../../types/flicker";
import { Images } from "../../types/images";

const defaultDescription = "Flicker Image";

export const getDescription = (image: FlickerImage): string =>
  image.description._content.replace(/(<([^>]+)>)/gi, "").substring(0, 50) ||
  image.title ||
  defaultDescription;

export const parseImages = (images: FlickerImages): Images => {
  return images.map((image) => ({
    id: image.id,
    images: {
      small: image.url_s,
      medium: image.url_m,
      big: image.url_l,
    },
    description: getDescription(image),
    altDescription: `${image.ownername} image`,
    user: {
      name: image.ownername,
    },
  }));
};
