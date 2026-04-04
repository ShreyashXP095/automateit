"use client"

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-Workflow";
import { useState  , useCallback} from "react";

import {

   ReactFlow , 
   applyNodeChanges , 
   applyEdgeChanges , 
   addEdge , 
   type Node , 
   type Edge, 
   type NodeChange, 
   type EdgeChange , 
   type Connection ,    

   Background , 
   Controls ,
   MiniMap , 
   Panel , 
} from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import { nodeComponents } from "@/config/node-components";
import {AddNodeButton} from "./add-node-button"
// import { nodeComponents } from "@/config/node-components";
// import { useSetAtom } from "jotai";
// import { editorAtom } from "../store/atoms";
// import { NodeType } from "@/generated/prisma/enums";
// import { ExecuteWorkflowButton } from "./execute-workflow-button";

export const EditorLoading = () => {
    return (
       <LoadingView message="Editor Loading..."/>
    );
}

export const EditorError = () => {
    return (
       <ErrorView message="Error Loading editor"/>
    );
}

// const initialNodes = [
//   { id: 'n1', 
//     position: { x: 0, y: 0 }, 
//     data: { label: 'Node 1' } 
//   },
//   { id: 'n2', 
//     position: { x: 0, y: 100 }, 
//     data: { label: 'Node 2' } 
//   },
// ];
// const initialEdges = [
//     { 
//         id: 'n1-n2', 
//         source: 'n1', 
//         target: 'n2' 
//     }
// ];
 

export const Editor = ({workflowId}: {workflowId: string}) => {
    const {
        data: workflow
    } = useSuspenseWorkflow(workflowId);

    const [nodes, setNodes] = useState< Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);

    const onNodesChange = useCallback(
    (changes : NodeChange []) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes : EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params : Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

    return (
     <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        fitView // automatically zoom-in on nodes we have . 
        proOptions={{
            hideAttribution: true,
        }}  
      >
          <Background/> 
          { /* it is just a background , ye vo dot-2 vala bg dera .  */ }
          <Controls/>
          {/* vo canvas size + - buttons  */}
          <MiniMap/>       
          {/* vo chota sa canvas jisme pura graph dikhta h  */}

          <Panel>
             <AddNodeButton/>
          </Panel>
      </ReactFlow>
    </div>  
    );
}   
