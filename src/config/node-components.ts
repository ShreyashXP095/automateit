import { Nodetype } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";
import { InitialNode } from "@/components/initial-node";

export const nodeComponents = {
    [Nodetype.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;