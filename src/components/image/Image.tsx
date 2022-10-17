import { Image as ImageType } from "../../types/images";
import React, { BaseSyntheticEvent } from "react";
import "./Image.scss";

type ImageProps = {
  image: ImageType;
  addFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const Image = ({ image, addFavorite, isFavorite }: ImageProps) => {
  return (
    <div className="image-container">
      <picture>
        <source media="(max-width: 564px)" srcSet={image.images.small} />

        <img
          className="image-container__image"
          onLoad={(e: BaseSyntheticEvent) => {
            e.currentTarget.style.opacity = "1";
          }}
          src={image.images.medium}
          title={image.description}
          alt={image.altDescription}
          loading="lazy"
        />
      </picture>

      <div className="image-container__info-block">
        <span className="image-container__info-block--description">
          {image.description}
        </span>
        <span className="image-container__info-block--user">
          {image.user.name}
        </span>
        <button
          className={`image-container__info-block--button 
            ${
              isFavorite(image.id)
                ? "image-container__info-block--favorite-button"
                : "image-container__info-block--default-button"
            }`}
          onClick={() => addFavorite(image.id)}
          name="Favorite"
        >
          {isFavorite(image.id) ? "Remove From Favorites" : "Add To Favorites"}
        </button>
      </div>
    </div>
  );
};

export default Image;
