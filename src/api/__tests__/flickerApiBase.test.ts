import FlickerApiBase from "../FlickerApiBase";
import fetch from "../requestBase";
import * as API_CONSTANTS from "../api.config";

jest.mock("../requestBase");

describe("FlickerApi", () => {
  it("calls fetch and returns result", async () => {
    (fetch as any).mockResolvedValue({
      json: () =>
        Promise.resolve({
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
        }),
    });

    const result = await FlickerApiBase.request("/flicker-search");

    expect(result).toEqual({
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

    expect(fetch).toHaveBeenCalledWith(
      `${API_CONSTANTS.FLICKER_API_BASE_URL}/flicker-search`
    );
  });
});
