"use client"

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-Workflow";

// import '@xyflow/react/dist/style.css';
// import { nodeComponents } from "@/config/node-components";
// import { AddNodeButton } from "@/components/add-node-button";
// import { useSetAtom } from "jotai";
// import { editorAtom } from "../store/atoms";
// import { NodeType } from "@/generated/prisma/enums";
// import { ExecuteWorkflowButton } from "./execute-workflow-button";

export const EditorLoading = () => {
    return (
       <LoadingView message="Editor Loading..."/>
    );
}

export const EditorError = () => {
    return (
       <ErrorView message="Error Loading editor"/>
    );
}


export const Editor = ({workflowId}: {workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId);

    return (
      <div className="size-full">
       {JSON.stringify( workflow , null , 2)}   ; 
      </div>
    );
}   
