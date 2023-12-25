import { useQuery } from "@tanstack/react-query";
import userService from "@/services/users.service";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
    select: ({ data }) => data,
  });
};
