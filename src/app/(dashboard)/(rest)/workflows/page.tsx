import { requireAuth } from "@/lib/auth-utils";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import {Suspense} from "react";
import { WorkflowsContainer } from "@/features/workflows/components/workflows";
import { WorkflowsList } from "@/features/workflows/components/workflows";
const page = async () => {
    await requireAuth();
    // iss step ne server par pehle hi sare workflow cache kara diye !!
    prefetchWorkflows();
    return (
        <WorkflowsContainer>
        {/*  ye hydration client server se data leke aata hai and browser ko de deta hai 
          taaki browser ko baar baar server se data na maangna pade */}
        <HydrateClient> 
            <ErrorBoundary fallback={<div>Error!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <WorkflowsList/>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
        </WorkflowsContainer>
    );
}
export default page;                   