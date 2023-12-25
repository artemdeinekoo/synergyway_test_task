import { useMutation } from "@tanstack/react-query";
import usersService from "@/services/users.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGenerateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["generate users"],
    mutationFn: (amount: number) => usersService.generateRandomUsers(amount),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Users successfully added!");
    },
    async onError() {
      toast.error("Number of users should be in range from 1 to 100");
    },
  });
};
