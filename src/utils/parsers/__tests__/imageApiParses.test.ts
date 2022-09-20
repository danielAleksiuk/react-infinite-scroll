import { parseImages } from "../imageApiParser";

describe("image api parser", () => {
  describe("description content is given", () => {
    const data = [
      {
        id: "1",
        url_s: "url-small",
        url_m: "url-medium",
        url_l: "url-big",
        description: {
          _content: "<h1>description</h1>",
        },
        ownername: "Owner",
        title: "Title",
      },
    ];

    it("parses the data, replace tags", () => {
      expect(parseImages(data)).toEqual([
        {
          altDescription: "Owner image",
          description: "description",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });

  describe("description content is not given", () => {
    const data = [
      {
        id: "1",
        url_s: "url-small",
        url_m: "url-medium",
        url_l: "url-big",
        description: {
          _content: "",
        },
        ownername: "Owner",
        title: "Title",
      },
    ];

    it("uses title as description", () => {
      expect(parseImages(data)).toEqual([
        {
          altDescription: "Owner image",
          description: "Title",
          id: "1",
          images: { big: "url-big", medium: "url-medium", small: "url-small" },
          user: { name: "Owner" },
        },
      ]);
    });
  });
});
