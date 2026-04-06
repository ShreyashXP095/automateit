"use client";

import {NodeToolbar, Position} from "@xyflow/react";
import {SettingsIcon , TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import type {ReactNode} from "react";

interface WorkflowNodeProps {
    children : ReactNode;
    showToolbar? :  boolean;
    onDelete? : () => void;
    onSettings? : () => void;
    name? : string;
    description? : string;
};

export function WorkflowNode ({
    children,
    showToolbar = true,
    onDelete,
    onSettings,
    name,
    description,
}: WorkflowNodeProps){
    return (
    <>
    {showToolbar && (
                <NodeToolbar
                    position={Position.Top}
                    isVisible={showToolbar}
                >
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onSettings}
                
                >
                    <SettingsIcon className="size-4"/>
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onDelete}
                >
                    <TrashIcon className="size-4"/>
                </Button>
            </NodeToolbar>
        )}
        {children}
        <NodeToolbar
            position={Position.Bottom}
            isVisible={showToolbar}
            className="max-w-[200px] text-center"
        >
            <p className="font-medium">
                {name}
            </p>
            {description && <p className="text-xs text-muted-foreground truncate">
                {description}
            </p>}
        </NodeToolbar>
    </>
    );
}