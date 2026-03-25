"use client";

import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import {authClient} from "@/lib/auth-client";
import {usePathname, useRouter} from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

// add new links here in sidebar!!
const menuItems = [
    {
        title: "Main",
        items: [
            {
                title : "workflows",
                icon : FolderOpenIcon,
                url :"/workflows",
            },
            {
                title : "executions",
                icon : HistoryIcon,
                url :"/executions",
            },
            {
                title : "credentials",
                icon : KeyIcon,
                url :"/credentials",
            }, 
        ],
    },
];

export const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        //  only icons visible when collapsed   
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link href="/workflows" prefetch>
                            <Image src="/logos/logo.svg" alt="automateit" width={30} height={30}/>
                            <span className="font-semibold text-lg">Nodebase</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) =>(
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) =>(
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton 
                                        tooltip={item.title}
                                        isActive={
                                            item.url === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(item.url)
                                        }
                                        asChild
                                        className ="gap-x-4 h-10 px-4"
                                        >
                                            <Link href={item.url} prefetch>
                                                <item.icon className="size-4"/>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                                </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Upgrade to pro" className="gap-x-4 h-10 px-4" onClick={()=>{}}>
                            <StarIcon className="h-4 w-4"/>
                            <span>Upgrade to pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Billing Portal" className="gap-x-4 h-10 px-4" onClick={()=>{}}>
                            <CreditCardIcon className="h-4 w-4"/>
                            <span>Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Sign out" className="gap-x-4 h-10 px-4" onClick={()=>{
                            authClient.signOut( 
                                {
                                    fetchOptions:{
                                        onSuccess:()=>{
                                            router.push("/login");
                                        }
                                    }
                                }
                            );
                        }}>
                            <LogOutIcon className="h-4 w-4"/>
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
export default AppSidebar;