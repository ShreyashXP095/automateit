import AppSidebar from "@/components/app-sidebar";
import {SidebarInset , SidebarProvider} from "@/components/ui/sidebar"
import {Appheader} from "@/components/app.header";
const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <>
            <Appheader/>
            <main className="flex-1">
                {children}
            </main>
        </>
    );
};
export default Layout;