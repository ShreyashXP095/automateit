"use client" ;


import { 
    EntityHeader  , 
    EntityContainer , 
    EntitySearch ,
    EntityPagination, 
    LoadingView , 
    ErrorView,
    EmptyView,   
    EntityList , 
    EntityItem, 
    } from "@/components/entity-components";

import { 
    useCreateWorkflow  ,
    useSuspenseWorkflows , 
    useRemoveWorkflow  
    } from "../hooks/use-Workflow";  

import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

import { useEntitySearch } from "@/hooks/use-entity-search";

import type { Workflow } from "@/generated/prisma/client";

import { WorkflowIcon } from "lucide-react";

import { formatDistanceToNow } from "date-fns";

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
    //throw new Error("testing WorkflowsError") ;
    const workflows = useSuspenseWorkflows() ;

    return (
        <EntityList

           items = {workflows.data.items}
           getKey={(workflow) => workflow.id}
           renderItem={(workflow)=>      
             <WorkflowItem data = {workflow}/>
           }
           emptyView={<WorkflowsEmpty/>}    
        />
    )
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

export const WorkflowsLoading = () => {
    return <LoadingView message = "Loading workflows..."/> ;   
}

export const WorkflowsError = () => {
    return <ErrorView message = "Error loading workflows"/> ;   
}   

export const WorkflowsEmpty = () => {
    const router = useRouter() ;    
    const createWorkflow = useCreateWorkflow() ; 

    const {handleError , modal}  = useUpgradeModal() 

    const handleCreate = ()=>{
        createWorkflow.mutate(undefined , {
            onError : (error)=>{
                // TODO : open upgrade model . 
                //console.log(error) ; 
                handleError(error) ;    
            } , 
            onSuccess : (data)=>{
                router.push(`/workflows/${data.id}`) ; 
            } , 
        }) ; 
    }   
    return (
        <>
            <EmptyView 
            onNew={handleCreate}
               message = "You have not created any workflows yet , Get Started by creating your first workflow "
            /> ;   
        </>
    )
} ;


export const WorkflowItem = ({
   data,
}: {
   data: Workflow
}) => {
    const removeWorkflow = useRemoveWorkflow();

    const handleRemove = () => {
        removeWorkflow.mutate({id: data.id})
    }

    return (


        <EntityItem
        key={data.id}
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
              Updated {" "}
              {formatDistanceToNow(data.updatedAt , {addSuffix:true})} {"  "}
              &bull;  Created{" "}
              {formatDistanceToNow(data.createdAt , {addSuffix:true})}
            </> 
        }
        image = {
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground" />
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}

        />
    )
}