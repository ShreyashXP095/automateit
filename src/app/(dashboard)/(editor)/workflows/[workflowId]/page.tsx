import {requireAuth} from "@/lib/auth-utils";   
import {prefetchOneWorkflow} from "@/features/workflows/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import {EditorError, EditorLoading} from "@/features/editor/components/editor";
import {Editor} from "@/features/editor/components/editor";
import {EditorHeader} from "@/features/editor/components/editor-header";
interface PageProps{
    params : Promise<{workflowId : string}>;
}
const page = async ({params}:PageProps)=>{
    await requireAuth();
    const {workflowId} = await params;
    prefetchOneWorkflow(workflowId);
    return (
        <div className="flex flex-col h-screen">
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
        </div>
    );
}
export default page;    