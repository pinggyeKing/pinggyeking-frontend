import { useQuery } from "@tanstack/react-query";
import { fetchExcuseDetail } from "./excuseDetail";

export const useExcuseDetail = (excuseId: string) => {
  return useQuery({
    queryKey: ["excuseDetail", excuseId],
    queryFn: () => fetchExcuseDetail(excuseId),
    enabled: !!excuseId, // excuseId가 있을 때만 쿼리 실행
  });
};
