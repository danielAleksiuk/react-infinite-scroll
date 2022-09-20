import FlickerApiBase from "../FlickerApiBase";
import FlickerApiService from "../FlickerApiService";
import * as API_CONSTANTS from "../api.config";

jest.mock("../FlickerApiBase");

describe("Filcker api service", () => {
  describe("when calling is successful", () => {
    it("calls FlickerAPIBase and returns images", async () => {
      (FlickerApiBase.request as any).mockResolvedValue({
        photos: {
          pages: 2,
          photo: [
            {
              id: "1",
              url_s: "url-small",
              url_m: "url-medium",
              url_l: "url-big",
              description: {
                _content: "description",
              },
              ownername: "Owner",
            },
          ],
        },
      });

      expect(await FlickerApiService.find(1)).toEqual({
        error: null,
        isLastPage: false,
        images: [
          {
            id: "1",
            images: {
              small: "url-small",
              medium: "url-medium",
              big: "url-big",
            },
            description: "description",
            altDescription: "Owner image",
            user: {
              name: "Owner",
            },
          },
        ],
      });

      expect(FlickerApiBase.request).toHaveBeenLastCalledWith(
        `/?method=flickr.photos.search&api_key=${API_CONSTANTS.FLICKER_API_KEY}&extras=owner_name,url_l,url_s,url_m,url_l,description,title&safe_search=1&tags=${API_CONSTANTS.FLICKER_API_TAGS}&format=json&nojsoncallback=1&per_page=12&page=1`
      );
    });
  });

  describe("when calling reqeust with error", () => {
    it("calls FlickerAPIBase and returns default error message", async () => {
      (FlickerApiBase.request as any).mockRejectedValue("error");

      expect(await FlickerApiService.find(1)).toEqual({
        error: "Something went wrong, try again",
        isLastPage: false,
        images: [],
      });
    });
  });
});
