"use client"

import { Node, NodeProps , useReactFlow} from "@xyflow/react";
import { memo, useState } from "react";
import { GlobeIcon } from "lucide-react";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PATCH" | "DELETE" ; 
    body?: string;
    [key:string] :unknown ; 
} ; 

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props:NodeProps<HttpRequestNodeType>)=>{ 
   const nodeData = props.data as HttpRequestNodeData ; 
   const description = nodeData?.endpoint 
        ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` 
        : "NOt configured" ; 
    return (
        <>
        <BaseExecutionNode
        {...props}
        id = {props.id}
        icon={GlobeIcon}
        name = "HTTP Request"
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
        />  
        </>
    )
}) ; 

HttpRequestNode.displayName = "HttpRequestNode"  ;