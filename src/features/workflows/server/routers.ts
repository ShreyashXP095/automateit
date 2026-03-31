import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init" ; 
import { generateSlug } from "random-word-slugs" ;
import prisma from "@/lib/db";
import z from "zod" ;
import { ChartScatter } from "lucide-react";
export const workflowRouter = createTRPCRouter({
        create: premiumProcedure.mutation(({ctx})=>{ // it is to create a new workflow 
             return prisma.workflow.create({
                  data:{
                    name : generateSlug(3) , // means gen 3 random words 
                    userId: ctx.auth.user.id  , 
                  } , 
             }) ; 
        }) , 
        remove: protectedProcedure.
        input(z.object({id:z.string()})) 
        .mutation(({ctx, input})=>{ // it is to remove a workflow  // noly used who creted it can delete it . 
            return prisma.workflow.delete({
                where:{
                    id: input.id , 
                    userId : ctx.auth.user.id , 
                } , 
            }) ; 
        })  , 

        updateName: protectedProcedure
        .input(z.object({id:z.string(), name:z.string()})) // how it work ? -- > 
        .mutation(({ctx, input})=>{ // it is to update a workflow name 
            return prisma.workflow.update({
                where:{
                    id: input.id , 
                    userId : ctx.auth.user.id , 
                } , 
                data:{
                    name : input.name , 
                } , 
            }) ; 
        })  , 

        getOne: protectedProcedure
        .input(z.object({id : z.string()}))
        .query(({ctx ,input})=>{ // it is to get a workflow 
            return prisma.workflow.findUnique({
                where:{
                    id : input.id , 
                    userId : ctx.auth.user.id , 
                } , 
            }) ; 
        })  , 
        getMany: protectedProcedure
        .query(({ctx})=>{ // it is to get a workflow 
            return prisma.workflow.findMany({
                where:{
                    userId : ctx.auth.user.id , 
                } , 
            }) ; 
        })  , 
}) ; 