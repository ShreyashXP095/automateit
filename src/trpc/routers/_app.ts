import { protectedProcedure, createTRPCRouter } from '../init';
import prisma from '@/lib/db';
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { premiumProcedure } from "../init";
import { workflowRouter } from '@/features/workflows/server/routers';
export const appRouter = createTRPCRouter({
    workflows:workflowRouter ,   
});
// export type definition of API
export type AppRouter = typeof appRouter;