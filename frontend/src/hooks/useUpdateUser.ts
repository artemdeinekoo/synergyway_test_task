import { useMutation } from "@tanstack/react-query";
import usersService from "@/services/users.service";
import { IUpdateUser } from "@/interfaces/User";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update user"],
    mutationFn: (userData: { id: number; updateUser: IUpdateUser }) =>
      usersService.updateUser(userData.id, userData.updateUser),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User was successfully updated!");
    },
    async onError() {
      toast.error("There's a problem updating a user.");
    },
  });
};
