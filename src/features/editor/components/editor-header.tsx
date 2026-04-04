"use client" ; 

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SaveIcon } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input";
import { useState , useRef , useEffect } from "react";
import Link from "next/link";
import { useSuspenseWorkflow , useUpdateWorkflowName } from "@/features/workflows/hooks/use-Workflow";  
import { workerData } from "worker_threads";
import { Editor } from "./editor";
// import { useAtomValue } from "jotai";
// import { editorAtom } from "../store/atoms";


export const EditorSaveButton = ({workflowId}: {workflowId: string}) => {

    return (
        <div className="ml-auto">
            <Button size="sm" onClick={()=>{}} disabled={false  }>
                <SaveIcon className="h-4 w-4"/>
                 Save
            </Button>
        </div>
    );
}

export const EditorNameInput = ({workflowId}: {workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId);
    const useUpdateWorkflow = useUpdateWorkflowName() ; 

    const [isEditing , setIsEditing]  = useState(false) ; 

    const [name , setName] = useState(workflow.name) ;

    const inputRef = useRef<HTMLInputElement>(null) ;

    useEffect(()=>{
        if(workflow.name){
            setName(workflow.name) ; 
        }
    } , [workflow.name]) ; 

    useEffect(()=>{
        if(isEditing && inputRef.current){
            inputRef.current.focus() ; // it will focus on the input field when the component is rendered   
            inputRef.current.select() ;
        }
    } , [isEditing]) ; 

    const handleSave = async () =>{
      if(name == workflow.name){
        setIsEditing(false) ;
        return ; 
      }
    
      setIsEditing(false) ; 

      try{
        await useUpdateWorkflow.mutateAsync({
            id: workflowId , 
            name , // id vhi rkho aur name change krdo  
        }) ;
      }
      catch{
        setName(workflow.name) ;    // vrna iss name state ko vhi rkho jo phle thi .     
      }
    } ; 

    const handleKeyDowen = (e: React.KeyboardEvent) => {
        if(e.key == "Enter"){
            handleSave() ;
        }
        else if(e.key == "Escape"){
            setName(workflow.name) ;
            setIsEditing(false) ;
        }
    }  ; 
    
    if(isEditing){
         return (
             <Input
                  ref = {inputRef}
                  value = {name}
                  onChange = {(e)=>setName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown = {handleKeyDowen}
                  className="h-7 w-auto min-w-[100px] px-2"
             />
         );
    }

    return (
        <BreadcrumbItem 
          onClick={()=> setIsEditing(true)}
          className="cursor-pointer hover:text-foreground transition-colors">
           
           {workflow.name}
           
        </BreadcrumbItem>
    )
    
};      

export const EditorBreadcrumbs = ({workflowId}: {workflowId: string}) => {
    return (
       <Breadcrumb>
           <BreadcrumbList> 
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link prefetch href="/workflows">
                        Workflows
                    </Link> 
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              {/* <BreadcrumbItem> */}
                <EditorNameInput workflowId={workflowId}/>
              {/* </BreadcrumbItem> */}
           </BreadcrumbList>        
       </Breadcrumb>
    );
}

export const EditorHeader =({workflowId}:  {workflowId : string})=>{
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger/>
            <div className="flex flex-row items-center justify-between gap-x-4 w-full">
                <EditorBreadcrumbs workflowId = {workflowId}/>
                <EditorSaveButton workflowId = {workflowId}/>
            </div>
        </header>
    );
}