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
                            productId:"7d49b573-092d-4278-87ec-21e4b079808a",
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