import React, { useRef } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useLoadImages from "../../hooks/useLoadImages";
import useFavoriteImage from "../../hooks/useFavoriteImage";
import Loader from "../loader/Loader";
import Image from "../image/Image";
import { Image as ImageType } from "../../types/images";
import FlickerApiService from "../../api/flickerApiService";
import "./Gallery.scss";

const Gallery = () => {
  const { loading, hasNextPage, images, loadMore, error } =
    useLoadImages(FlickerApiService);

  const { isFavorite, addFavorite } = useFavoriteImage();
  const ref = useRef(null);

  useInfiniteScroll({ ref, loadMore, loading, hasNextPage });

  return (
    <>
      {error && <span className="error">{error}</span>}

      <div className="grid">
        {images.map((image: ImageType) => (
          <Image
            key={image.id}
            image={image}
            isFavorite={isFavorite}
            addFavorite={addFavorite}
          />
        ))}
      </div>

      {loading && <Loader />}
      <div ref={ref}> </div>

{/* <Loader /> */}
    </>
  );
};

export default Gallery;
