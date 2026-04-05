import { NodeType  } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

import { InitialNode } from "@/components/initial-node";

import { HttpRequestNode } from "@/features/executions/componenets/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/manual-trigger/node";

export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,

} as const satisfies NodeTypes; 


export type RegisteredNodeTypes = keyof typeof nodeComponents;