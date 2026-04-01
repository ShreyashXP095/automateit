"use client" ;


import { EntityHeader  , EntityContainer , EntitySearch , EntityPagination} from "@/components/entity-components";
import { useCreateWorkflow  , useSuspenseWorkflows} from "../hooks/use-Workflow";  
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkflowsSearch = () =>{

    const [params , setParams] = useWorkflowsParams();
    const {searchValue , onSearchChange} = useEntitySearch({
        params,
        setParams,
        debounceMs: 500,
    })

    return (
        <EntitySearch
        value = {searchValue}
        onChange={onSearchChange}
        placeholder="Search workflows"
        />
    )
}


export const WorkflowsList = ()=>{
    const workflows = useSuspenseWorkflows() ;
    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
               {JSON.stringify(workflows.data ,null , 2)} ;
            </p>
        </div>
    ) ;     
} ;     

export const WorkflowsHeader = ({disabled} : {  disabled?:boolean}) => {
    const createWorkflow = useCreateWorkflow() ;  
    
    const router = useRouter() ; 
    
    const {handleError , modal}  = useUpgradeModal() 

    const handleCreate = ()=>{
        createWorkflow.mutate(undefined , {
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`) ; 
            }, 
            onError : (error)=>{
                // TODO : open upgrade model . 
                //console.log(error) ; 
                handleError(error) ;    
            } , 
        }) ; 
    }
    return (
     <> 
        {modal}
        <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        //newButtonHref="/workflows/new"
        disabled={disabled}
        isCreating ={createWorkflow.isPending   } 
        />
    </>
    )
} ; 

export const  WorkflowsPagination = () => {
    const [params , setParams] = useWorkflowsParams() ;
    const workflows = useSuspenseWorkflows() ;
   
    return (
        <EntityPagination
        disabled =  {workflows.isFetching}
        totalPages={workflows.data.totalPages}
        page={workflows.data.page}
        onPageChange={(page) => setParams({...params  , page })}
        />
    ) ; 
} ;     

export const WorkflowsContainer = ({
    children 
}:{
    children : React.ReactNode ;    
}) => {
    return (
    <>
        <EntityContainer
        header={<WorkflowsHeader/>}
        search={<WorkflowsSearch/>}
        pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    </>
    ) ;
} ; 