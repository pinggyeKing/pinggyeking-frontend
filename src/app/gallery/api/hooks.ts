import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "./gallery";

export const useGallery = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
  });
};
