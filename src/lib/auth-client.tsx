// bas ek authenticated user bana rhe hain yahan
import { createAuthClient } from "better-auth/react";
import {polarClient} from "@polar-sh/better-auth";
export const authClient = createAuthClient({
    plugins:[
        polarClient(),
    ],
});