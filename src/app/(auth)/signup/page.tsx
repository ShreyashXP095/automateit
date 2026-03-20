import {RegisterForm} from "@/features/auth/components/register-form"
import {requireUnauth} from "@/lib/auth-utils"
const Page = async()=>{
    // this is used for protected routes and 
    // isko handle better auth kar rha hai
    // headers me cookies and tokens store kara kr better auth ko de diya
    // it created a session and if created then "/" otherwise to "/login"
    //  ye sab bas user ko errors throw na ho isiye hai bas asal security through tRPC hoti hai


    await requireUnauth();
    return (
        <div>
            <RegisterForm/>
        </div>
    );
};
export default Page;