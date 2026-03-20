// landing page 
import {requireAuth} from "@/lib/auth-utils"
import {caller} from "@/trpc/server"
const Page = async ()=> {

  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div className="min-h-screen flex items-center justify-center">
       protected server components
       {JSON.stringify(data)}
    </div>
  );
};

export default Page;
  