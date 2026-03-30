"use client";
import { EntityContainer } from "@/components/entity-components";
import {EntityHeader} from "@/components/entity-components";
import {useSuspenseWorkflow} from "../hooks/use-workflow";

export const WorkflowsList = ()=>{
    const workflows = useSuspenseWorkflow();

    return (
       <p>
            {JSON.stringify(workflows.data, null, 2)}
       </p>
    );
};

export const ExecutionsHeader = ({disabled} : {disabled? : boolean}) => {
    return (
        <EntityHeader
            title="Executions"
            description="Track the status of your workflow runs."
            newButtonLabel="check executions"
            disabled={disabled}
            isCreating={false}
            onNew={()=>{}}
        />
    );
}
export const ExecutionsContainer = ({children}: {children : React.ReactNode}) =>{
    return (
        <EntityContainer
            header={<ExecutionsHeader/>}
            search={<></>}
            pagination={<></>}
        >
            {children}
        </EntityContainer>
    );
};
    