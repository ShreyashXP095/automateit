import {requireAuth} from "@/lib/auth-utils";   
import {prefetchOneWorkflow} from "@/features/workflows/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import {EditorError, EditorLoading} from "@/features/editor/components/editor";
import {Editor} from "@/features/editor/components/editor";
import {EditorHeader} from "@/components/editor-header";
interface PageProps{
    params : Promise<{workflowId : string}>;
}
const page = async ({params}:PageProps)=>{
    await requireAuth();
    const {workflowId} = await params;
    prefetchOneWorkflow(workflowId);
    return (
        <p>
            <HydrateClient> 
                <ErrorBoundary fallback={<EditorError/>}>
                    <Suspense fallback={<EditorLoading/>}>
                        <EditorHeader workflowId = {workflowId}/>
                        <main className = "flex-1">
                            <Editor workflowId={workflowId}/>
                        </main>
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </p>
    );
}
export default page;    