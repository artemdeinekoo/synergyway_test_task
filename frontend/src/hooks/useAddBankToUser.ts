import { useMutation } from "@tanstack/react-query";
import usersService from "@/services/users.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddBankToUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add bank to user"],
    mutationFn: (data: { user_id: number; bank_id: number }) =>
      usersService.addBankToUser(data.user_id, data.bank_id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get user unknown banks"] });
      toast.success("User was successfully added to the Bank!");
    },
  });
};
