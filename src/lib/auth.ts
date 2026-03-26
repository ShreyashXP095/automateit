import {checkout , polar , portal} from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db"
import {polarClient} from "@/lib/polar";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn : true
    },
    plugins:[
        polar({
            client: polarClient,
            createCustomerOnSignUp:true,
            use: [
                checkout({
                    products:[
                        {
                            productId:"3d706d8e-a539-46ee-ab62-ffde20e603c7",
                            slug:"pro",
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly:true,
                }),
                portal(),
            ],
        })
    ],
});