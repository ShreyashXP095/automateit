import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init" ; 
import { generateSlug } from "random-word-slugs" ;
import prisma from "@/lib/db";
import z from "zod" ;
import { ChartScatter } from "lucide-react";

import { PAGINATION } from "@/config/constants";    
import {  NodeType } from "@/generated/prisma/client";
import {Node , Edge} from "@xyflow/react" ; 

export const workflowRouter = createTRPCRouter({
        create: premiumProcedure.mutation(({ctx})=>{ // it is to create a new workflow 
             return prisma.workflow.create({
                  data:{
                    name : generateSlug(3) , // means gen 3 random words 
                    userId: ctx.auth.user.id  , 
                    
                    nodes:{
                        createMany:{
                          data : [
                           { 
                            type:NodeType.INITIAL , 
                            position:{x:0 , y :0 } , 
                            name:NodeType.INITIAL, 
                           }  , 
                           // can add more intial nodes, by { --} , {--} same way . 
                          ]   
                        }   ,
                    } , 
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
        .query(async({ctx ,input})=>{ // it is to get a workflow 
            const workflow = await  prisma.workflow.findUniqueOrThrow({
                where:{
                    id : input.id , 
                    userId : ctx.auth.user.id , 
                } , 
                include : {nodes:true ,connections : true } , 
            }) ; 
             
            // transform server nodes to react-flow compatible nodes . 
            const nodes : Node[]= workflow.nodes.map((node)=>({
                id:node.id , 
                type:node.type , 
                position:node.position as { x:number , y:number} , 
                data:(node.data as Record<string , unknown>) || {},    
            })) ; 

            // transform server edges to react-flow compatible nodes . 
            const edges : Edge[]= workflow.connections.map((connection)=>({
                id:connection.id , 
                source:connection.fromNodeId , 
                target:connection.toNodeId , 
                sourceHandle:connection.fromOutput , 
                targetHandle:connection.toInput , 
            })) ; 

            return {
                id:workflow.id , 
                name: workflow.name , 
                nodes , 
                edges , 
            } ; 
        })  ,   
        getMany: protectedProcedure
        .input(
            z.object({
                page: z.number().optional().default(PAGINATION.DEFAULT_PAGE),
                pageSize: z
                  .number()
                  .min(PAGINATION.MIN_PAGE_SIZE)
                  .max(PAGINATION.MAX_PAGE_SIZE)
                  .default(PAGINATION.DEFAULT_PAGE_SIZE),  
                search : z.string().default("") , 

            })  
        )
        .query(async({ctx , input})=>{ // it is to get a workflow 
            const { page , pageSize , search} = input ; 

            const [items , totalCount]  = await     Promise.all([
                prisma.workflow.findMany({
                    skip : (page-1)*pageSize , 
                    take : pageSize ,    
                    
                    where:{
                        userId : ctx.auth.user.id , 
                        name :{
                            contains:search  , 
                            mode:"insensitive" , 
                        } , 
                    } , 
                    orderBy:{
                        updatedAt :"desc" , 
                    } , 
                })  , 
                prisma.workflow.count({
                    where:{
                        userId : ctx.auth.user.id , 
                        name :{
                            contains:search  , 
                            mode:"insensitive" , 
                        } , 
                    } , 
                })  , 
            ]) ; 

            const totalPages = Math.ceil(totalCount/pageSize) ; 
            const hasNextPage = page < totalPages ; 
            const hasPreviousPage = page > 1 ; 

            return {
                items : items ,  
                page , 
                pageSize , 
                totalCount , 
                totalPages , 
                hasNextPage , 
                hasPreviousPage , 
                
            } ;     
            
        })  , 
}) ; 