import FlickerApiBase from "./flickerApiBase";
import { parseImages } from "../utils/parsers/imageApiParser";
import { FlickerResult, FlickerApiServiceType } from "../types/flicker";
import * as API_CONSTANTS from "./api.config";

const requestParams =
  `?method=flickr.photos.search&api_key=${API_CONSTANTS.FLICKER_API_KEY}` +
  `&extras=owner_name,url_l,url_s,url_m,url_l,description,title&safe_search=1&tags=${API_CONSTANTS.FLICKER_API_TAGS}` +
  "&format=json&nojsoncallback=1";

const find = async (page = 1) => {
  const requestURL = `/${requestParams}&per_page=${API_CONSTANTS.FLICKER_API_PER_PAGE}&page=${page}`;

  try {
    const images = await FlickerApiBase.request<FlickerResult>(requestURL);

    return {
      isLastPage: page === images.photos.pages,
      images: parseImages(images.photos.photo),
      error: null,
    };
  } catch (e) {
    return {
      isLastPage: false,
      images: [],
      error: "Something went wrong, try again",
    };
  }
};

const FlickerApiService: FlickerApiServiceType = { find };

export default FlickerApiService;
