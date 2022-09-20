import fetch from "./requestBase";
import * as API_CONSTANTS from "./api.config";

export const request = async <T>(url: string): Promise<T> => {
  const flickerUrl = `${API_CONSTANTS.FLICKER_API_BASE_URL}${url}`;
  const response = await fetch(flickerUrl);

  return await response.json();
};

const FlickerApiBase = { request };
export default FlickerApiBase;
