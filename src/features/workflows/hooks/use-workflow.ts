import { useTRPC } from "@/trpc/client";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
export const useSuspenseWorkflow = ()=>{
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

export const useCreateWorkflow = ()=>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`WorkFlow "${data.name}" created`);
                router.push(`/workflows/${data.id}`);
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions()
                );
            },
            onError: (error) => {
                toast.error(`Failed to create workflow: ${error.message}`);
            },
        })
    );
}