import banksService from "@/services/banks.service";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete bank"],
    mutationFn: (id: number) => banksService.deleteBank(id),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      toast.success("Bank was successfully deleted!");
    },
    async onError() {
      toast.warning("You can not delete a bank with users!");
    },
  });
};
