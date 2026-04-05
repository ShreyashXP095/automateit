"use-client"

import {type NodeProps , Position, useReactFlow} from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import {memo , type ReactNode} from "react"; 
import { BaseNode ,BaseNodeContent} from "@/components/react-flow/base-node";
import Image from "next/image"  

import {BaseHandle} from "@/components/react-flow/base-handle";

import { WorkflowNode } from "@/components/workflow-node";


interface BaseTriggerNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    // status?: NodeStatus;
    onSettings?: () => void;
    onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo((
    {   id, 
        icon: Icon,
         name,
         description,
         children,
        //  status = "initial",
         onSettings,
         onDoubleClick
    }: BaseTriggerNodeProps) => {

            const { setNodes , setEdges} = useReactFlow();
            
            const handleDelete = () =>{
                
            }

    return (
        <WorkflowNode
        name= {name}
        description={description}
          onSettings={onSettings}
           onDelete={handleDelete}>
            {/* <NodeStatusIndicator status={status} variant="border"> */}
                 <BaseNode onDoubleClick={onDoubleClick} className="rounded-l-2xl relative group" >
                  <BaseNodeContent>
                    {typeof Icon === "string" ? (
                        <img 
                        src={Icon}
                        alt={name} 
                        className="size-5 object-contain rounded-sm"/>
                        ) : (
                        <Icon className="size-5 text-muted-foreground"/>
                    )}
                    {children}
                   
                    <BaseHandle
                    id="source-1"
                    type="source"
                    position={Position.Right}
                    />
                  </BaseNodeContent>
                </BaseNode>
               {/* </NodeStatusIndicator> */}
        </WorkflowNode>
    )
})

BaseTriggerNode.displayName = "BaseTriggerNode";