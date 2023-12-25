import { useMutation } from "@tanstack/react-query";
import banksService from "@/services/banks.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGenerateBanks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["generate banks"],
    mutationFn: (amount: number) => banksService.generateRandomBanks(amount),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      toast.success("Banks successfully added!");
    },
    async onError() {
      toast.error("Number of banks should be in range from 1 to 100");
    },
  });
};
