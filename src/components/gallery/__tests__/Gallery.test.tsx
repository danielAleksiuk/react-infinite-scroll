import Gallery from "../Gallery";
import { render, screen } from "@testing-library/react";
import useLoadImages from "../../../hooks/useLoadImages";
import React from "react";
// import "@testing-library/jest-dom";

jest.mock("../../../hooks/useLoadImages");
jest.mock("../../../hooks/useInfiniteScroll");

describe("Gallery", () => {
  describe("when LoadImages returns images", () => {
    const images = [
      {
        id: "id",
        images: {
          small: "url-small",
          medium: "url-medium",
          big: "url-big",
        },
        description: "random description",
        altDescription: `random image`,
        user: {
          name: "username",
        },
      },
    ];

    beforeEach(() => {
      (useLoadImages as any).mockReturnValue({
        images,
        loading: false,
        hasNextPage: false,
        loadMore: jest.fn(),
        error: null,
      });
    });

    it("shows images", () => {
      render(<Gallery />);

      expect(screen.getByAltText(/random image/i)).toBeInTheDocument();
      expect(screen.getByText(/random description/i)).toBeInTheDocument();
      expect(screen.getByText(/username/i)).toBeInTheDocument();
      expect(screen.getByTitle(/random description/i)).toBeInTheDocument();
    });
  });

  describe("error", () => {
    beforeEach(() => {
      (useLoadImages as any).mockReturnValue({
        images: [],
        loading: true,
        hasNextPage: false,
        loadMore: jest.fn(),
        error: "random Error",
      });
    });

    it("shows error", () => {
      render(<Gallery />);

      expect(screen.getByText(/random Error/i)).toBeInTheDocument();
    });
  });
});
