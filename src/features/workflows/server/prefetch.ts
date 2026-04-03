import type {inferInput} from "@trpc/tanstack-react-query";
import{prefetch,trpc} from "@/trpc/server";
import {workflowsRouter} from "./routers";
type Input = inferInput<typeof trpc.workflows.getMany>;

// prefetch all workflows
export const prefetchWorkflows = (params : Input)=>{
    return prefetch(trpc.workflows.getMany.queryOptions(params));
};

// prefetch single workflow
export const prefetchOneWorkflow = (id : string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({id}));
}