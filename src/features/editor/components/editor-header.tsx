"use client";
import React from "react";
import {useSuspenseOneWorkflow} from "@/features/workflows/hooks/use-workflow";
import {useUpdateWorkflow} from "@/features/workflows/hooks/use-workflow";
import {SidebarTrigger} from "@/components/ui/sidebar"
import { SaveIcon } from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Input} from "@/components/ui/input";
import {useEffect, useState, useRef} from "react";
import Link from "next/link";

export const EditorSaveButton = ({workflowId} : {workflowId : string}) => {
    return (
        <div className="flex flex-row items-center gap-x-2">
            <Button
                size="sm"
                onClick={()=>{}}
                disabled = {false}
            >
                <SaveIcon className="size-4"/>
                Save
            </Button>
        </div>
    );
}

export const EditorBreadcrumbs = ({workflowId} : {workflowId : string}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link prefetch href="/workflows">Workflows</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <EditorNameInput workflowId = {workflowId}/>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export const EditorHeader =({workflowId} : {workflowId : string})=>{
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

export const EditorNameInput = ({ workflowId }:{ workflowId : string }) => {
    const {data : workflow} = useSuspenseOneWorkflow(workflowId);
    const updateWorkflow = useUpdateWorkflow();
    
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(workflow.name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(workflow.name){
            setName(workflow.name);
       }
    },[workflow.name]);

    useEffect(()=>{
        if(isEditing && inputRef.current){
            inputRef.current.focus();
            inputRef.current.select();
        }
    },[isEditing]);

    const handleSave = async() => {
        if(name === workflow.name){
            setIsEditing(false);
            return;
        }
        try{
            await updateWorkflow.mutateAsync({
                id : workflowId,
                name
            });
        }
        catch{
            setName(workflow.name);
        }
        finally{
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handleSave();
        }
        else if(e.key === "Escape"){
            setIsEditing(false);
            setName(workflow.name);
        }
    };

    if(isEditing){
        return (
            <BreadcrumbItem>
                <Input
                    ref={inputRef}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    className="h-7 w-auto min-w-[100px] px-2"
                    disabled={updateWorkflow.isPending}
                />
            </BreadcrumbItem>
        );
    }
    return (
        <BreadcrumbItem onClick={()=>setIsEditing(true)} className = "cursor-pointer hover:text-foreground transition-colors">
            {workflow.name}
        </BreadcrumbItem>
    );
}