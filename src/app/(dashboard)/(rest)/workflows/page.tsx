import {WorkflowsError} from "@/features/workflows/components/workflows";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import {Suspense} from "react";
import { WorkflowsContainer } from "@/features/workflows/components/workflows";
import { WorkflowsList } from "@/features/workflows/components/workflows";
import type {SearchParams} from "nuqs";
import {workflowsParamsLoader} from "@/features/workflows/server/params-loader";
import {WorkflowsLoading} from "@/features/workflows/components/workflows";
type Props = {
    searchParams: Promise<SearchParams>
}
const page = async ({searchParams}: Props) => {
    await requireAuth();
    // iss step ne server par pehle hi sare workflow cache kara diye !!
    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows(params);
    return (
        <WorkflowsContainer>
        {/*  ye hydration client server se data leke aata hai and browser ko de deta hai 
          taaki browser ko baar baar server se data na maangna pade */}
        <HydrateClient> 
            <ErrorBoundary fallback={<WorkflowsError/>}>
                <Suspense fallback={<WorkflowsLoading/>}>
                    <WorkflowsList/>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
        </WorkflowsContainer>
    );
}
export default page;                   