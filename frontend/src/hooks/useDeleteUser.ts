import { useMutation } from "@tanstack/react-query";
import usersService from "@/services/users.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete user"],
    mutationFn: (id: number) => usersService.deleteUser(id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User was successfully deleted!");
    },
  });
};
