"use client";

import {useSuspenseOneWorkflow} from "@/features/workflows/hooks/use-workflow";
import {ErrorView , LoadingView} from "@/components/entity-components";

export const EditorLoading = () => {
    return <LoadingView message="Loading workflow"/>;
}

export const EditorError = () => {
    return <ErrorView message="Failed to load workflow"/>;
}

export const Editor = ({workflowId} : {workflowId : string}) => {
    const { data : workflow } = useSuspenseOneWorkflow(workflowId);
    return (
        <p>{JSON.stringify(workflow,null,2)}</p>
    );
}
        