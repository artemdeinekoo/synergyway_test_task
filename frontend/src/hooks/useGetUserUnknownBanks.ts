import { useQuery } from "@tanstack/react-query";
import userService from "@/services/users.service";

export const useGetUserUnknownBanks = (id: number) => {
  return useQuery({
    queryKey: ["get user unknown banks"],
    queryFn: () => userService.getUserUnknownBanks(id),
    select: ({ data }) => data,
  });
};
