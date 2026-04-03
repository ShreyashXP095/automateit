/*
Hook to fetch all workflows  using suspense .
*/

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC() ; 
    const [params ] = useWorkflowsParams() ;   
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

/**
 Hook to create a new Workflow . 
*/

export const useCreateWorkflow = () =>{
    const router = useRouter() ; 
    const queryClient = useQueryClient() ; 
    const trpc = useTRPC() ; 

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess : (data) => {
                toast.success(`Workflow "${data.name}" created `)
                //router.push(`/workflows/${data.id}`);

                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({}),
                );
            } , 
            onError: (error)=>{
                toast.error(`Failed to create workflow : ${error.message}`)
            } , 
        }) , 
    ) ; 
};

export const useRemoveWorkflow = () => {
    const queryClient = useQueryClient() ; 
    const trpc = useTRPC() ; 

    return useMutation(
        trpc.workflows.remove.mutationOptions({
            onSuccess : (data) => {
                toast.success(`Workflow ${data.name} removed successfully `)
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({}),
                );
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryFilter({id:data.id}), // Remove/update cached data for that specific workflow because Deleted workflow should not remain cached.

                );  
            } , 
            onError: (error)=>{
                toast.error(`Failed to remove workflow : ${error.message}`)
            } , 
        }) , 
    ) ; 
}; 

/*

Hook to fetch single workflow using suspense .  

*/

export const useSuspenseWorkflow = (id:string) => {
    const trpc = useTRPC() ; 
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}));
};



export const useUpdateWorkflowName = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    

    return useMutation(
        trpc.workflows.updateName.mutationOptions({
            onSuccess: (data) =>{
                toast.success(`Workflow name updated "${data.name}"`);
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }));
            },
            onError: (error) => {
                toast.error(`Failed to update workflow name: ${error.message}`);
            }
        })
    )
}   