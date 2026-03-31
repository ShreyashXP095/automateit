"use client";
import { EntityPagination } from "@/components/entity-components";
import { useUpgradeModel } from "../hooks/use-upgrade-model";
import { useSuspenseWorkflow } from "../hooks/use-workflow";
import { EntityHeader } from "@/components/entity-components";
import { EntityContainer } from "@/components/entity-components";
import { useCreateWorkflow } from "../hooks/use-workflow";
import { EntitySearch } from "@/components/entity-components";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/features/workflows/hooks/use-entity-search";
export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams,
        debounceMs: 500,
    });
    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search workflows"
        />
    );
};
export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflow();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
    );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const createWorkflow = useCreateWorkflow();

    const { handleError, model } = useUpgradeModel();
    const handleCreateWorkflow = () => {
        createWorkflow.mutate(undefined, {
            // onSuccess: (data)=>{
            //     console.log(data);
            // },
            onError: (error) => {
                handleError(error);
            },
        });
    };
    return (
        <>
            {model}
            <EntityHeader
                title="Workflows"
                description="Manage your workflows"
                newButtonLabel="New Workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
                onNew={handleCreateWorkflow}
            />
        </>
    );
}
export const WorkflowsPagination = ()=>{
    const workflows = useSuspenseWorkflow();
    const [params, setParams] = useWorkflowsParams();
    return (
        <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page)=>setParams({...params,page})}
        />
    );
}
export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    );
};