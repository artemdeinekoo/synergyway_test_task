import { useMutation } from "@tanstack/react-query";
import banksService from "@/services/banks.service";
import { IUpdateBank } from "@/interfaces/Bank";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update bank"],
    mutationFn: (bankData: { id: number; updateBank: IUpdateBank }) =>
      banksService.updateBank(bankData.id, bankData.updateBank),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      toast.success("Bank was successfully updated!");
    },
    async onError() {
      toast.error("There's a problem updating a bank.");
    },
  });
};
