import { render, screen } from "@testing-library/react";
import Image from "../Image";
import React from "react";
import "@testing-library/jest-dom";

describe("Image", () => {
  const image = {
    id: "id",
    images: {
      small: "url-small",
      medium: "url-medium",
      big: "url-big",
    },
    description: "random description",
    altDescription: `random image`,
    user: {
      name: "random username",
    },
  };

  describe("rendering", () => {
    it("is in a right way", () => {
      render(
        <Image image={image} addFavorite={jest.fn()} isFavorite={jest.fn()} />
      );

      expect(screen.getByAltText(/random image/i)).toBeInTheDocument();
      expect(screen.getByText(/random description/i)).toBeInTheDocument();
      expect(screen.getByText(/random username/i)).toBeInTheDocument();
      expect(screen.getByTitle(/random description/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("src", "url-medium");
    });
  });
});
