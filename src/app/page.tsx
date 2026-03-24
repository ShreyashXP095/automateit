"use client";
// landing page 
import {useMutation , useQuery} from "@tanstack/react-query"
import {useTRPC} from "@/trpc/client"
import { LogoutButton } from "./logout"
import {toast} from "sonner";
import {Button} from "@/components/ui/button"
// import { useQueryClient } from "@tanstack/react-query";
const Page =  ()=> {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());
  // const queryClient = useQueryClient();
  const tests = useMutation(trpc.testAi.mutationOptions({
      onSuccess :()=>{
          toast.success("Job Queued Sucessfully !");
      }
  }));

  const create = useMutation(trpc.createWorkflow.mutationOptions({
      onSuccess : ()=>{
        toast.success("Job Queued");
      }
  }));
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-y-6 bg-gray-900 text-white">
       protected server components
       <div>
          {JSON.stringify(data)}
       </div>
       <Button disabled={tests.isPending} onClick={()=>tests.mutate()}>
        Test AI
       </Button>
       <Button disabled={create.isPending} onClick={()=>create.mutate()}>
        Create Workflow
        </Button>
       <LogoutButton />
    </div>
  );
};

export default Page;
  