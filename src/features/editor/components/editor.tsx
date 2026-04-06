"use client";
import {useSuspenseOneWorkflow} from "@/features/workflows/hooks/use-workflow";
import {ErrorView , LoadingView} from "@/components/entity-components";
import {useState,useCallback} from "react";
import {nodeComponents} from "@/config/node-components";
import {AddNodeButton} from "@/features/editor/components/add-node-button";
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    type NodeChange,
    type EdgeChange,
    type Connection,
    addEdge,
    type Node,
    Panel,
    type Edge,
    Background,
    Controls,
    MiniMap,
} from "@xyflow/react";
import {useReactFlow} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export const EditorLoading = () => {
    return <LoadingView message="Loading workflow"/>;
}

export const EditorError = () => {
    return <ErrorView message="Failed to load workflow"/>;
}

const initialNodes = [
    {
        id : "n1",
        data : {label : "node1"},
        position : {x : 0, y : 0},
    },
    {
        id : "n2",
        data : {label : "node2"},
        position : {x : 0, y : 100},
    },
]
const initialEdges = [
    {
        id : "n1-n2",
        source : "n1",
        target : "n2",
    }
]
export const Editor = ({workflowId} : {workflowId : string}) => {
    const { data : workflow } = useSuspenseOneWorkflow(workflowId);

    const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);

    const onNodesChange = useCallback((changes : NodeChange[]) => {
        setNodes((nodeSnapshot) => applyNodeChanges(changes,nodeSnapshot));
    }, []);

    const onEdgesChange = useCallback((changes : EdgeChange[]) => {
        setEdges((edgeSnapshot) => applyEdgeChanges(changes,edgeSnapshot));
    }, []);
    
    const onConnect = useCallback((params : Connection) => {
        setEdges((edgeSnapshot) => addEdge(params, edgeSnapshot));
    }, []);

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                proOptions={{
                    hideAttribution : true,
                }}
                nodeTypes={nodeComponents}
            >
            <Background/>
            <Controls/>
            <MiniMap/>
            <Panel position="top-right">
                <AddNodeButton/>
            </Panel>
            </ReactFlow>
        </div>
    );
}
        