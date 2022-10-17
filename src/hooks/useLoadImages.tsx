import { useCallback, useEffect, useState } from "react";
import { Images } from "../types/images";
import { FlickerApiServiceType } from "../types/flicker";

type useLoadImagesType = {
  loading: boolean;
  hasNextPage: boolean;
  images: Images;
  loadMore: () => void;
  error: string | null;
};

const useLoadImages = (
  FlickerApiService: FlickerApiServiceType
): useLoadImagesType => {
  const [images, setImages] = useState<Images>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(
    async (nextPage: number) => {
      setLoading(true);

      const {
        images: pic,
        isLastPage,
        error,
      } = await FlickerApiService.find(nextPage);

      setHasNextPage(!isLastPage);
      setLoading(false);
      setError(error);
      setImages((prevImages: Images) => [...prevImages, ...pic]);
    },
    [FlickerApiService]
  );

  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  const loadMore = async () => {
    const nextPage = page + 1;

    await fetchImages(nextPage);

    setPage(nextPage);
  };

  return { images, loading, hasNextPage, error, loadMore };
};

export default useLoadImages;
