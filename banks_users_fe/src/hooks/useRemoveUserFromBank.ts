import banksService from "@/services/banks.service";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRemoveUserFromBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove user from bank"],
    mutationFn: (data: { bank_id: number; user_id: number }) =>
      banksService.removeUserFromBank(data.bank_id, data.user_id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      toast.success("User was successfully removed from bank!");
    },
  });
};
