import { useQuery } from "@tanstack/react-query";
import banksService from "@/services/banks.service";

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => banksService.getAll(),
    select: ({ data }) => data,
  });
};
