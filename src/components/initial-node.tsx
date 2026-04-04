"use client"

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { memo } from "react";
import { WorkflowNode } from "./workflow-node";
// import { WorkflowNode } from "./workflow-node";
// import { NodeSelector } from "./node-selector";


export const InitialNode = memo((props: NodeProps) =>{
    //const [selectorOpen, setSelectorOpen] = useState(false);
    return ( 
            < WorkflowNode showToolbar = {false} >
               <PlaceholderNode {...props} 
                  onClick = {()=>{}}
               >
                <div className="flex items-center justify-center cursor-pointer">
                    <PlusIcon className="size-4 text-primary"/>
                </div>
              </PlaceholderNode>  
            </ WorkflowNode>
    )
})

InitialNode.displayName = "InitialNode";