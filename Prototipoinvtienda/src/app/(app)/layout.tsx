import type { Metadata } from "next";
import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"; // Use the Shadcn Sidebar component
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { Home, Package, Users, BarChart, LogOut, Settings, ShoppingCart } from "lucide-react"; // Import icons
import { UserMenu } from "@/components/user-menu"; // Assuming UserMenu component exists or will be created

export const metadata: Metadata = {
  title: "Inventienda Dashboard", // Updated title
  description: "Panel de control de Inventienda", // Updated description
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-foreground">
                <path d="M5.22 10.5h13.56a.75.75 0 0 0 0-1.5H5.22a.75.75 0 0 0 0 1.5Z" />
                <path fillRule="evenodd" d="M2.25 10.5c0-.783.31-1.535.878-2.082a3.001 3.001 0 0 1 2.082-.878c.83-.006 1.642.315 2.242.878l.114.104 7.596-6.077a.75.75 0 0 1 .97.055l.862.718a.75.75 0 0 1 .056.97l-7.64 6.112a3.001 3.001 0 0 1 3.138 4.164c.14 1.419-.284 2.836-1.198 3.878h3.18a.75.75 0 1 1 0 1.5H8.594a4.501 4.501 0 0 1-6.286-4.395 3.001 3.001 0 0 1-.058-4.164Z" clipRule="evenodd" />
            </svg>

            <span className="text-lg font-semibold text-primary-foreground">Inventienda</span> {/* Updated App Name */}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Panel de Control">
                <Link href="/dashboard"><Home /><span>Panel de Control</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Productos">
                <Link href="/products"><Package /><span>Productos</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild tooltip="Ventas">
                 <Link href="/sales"><ShoppingCart /><span>Ventas</span></Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Usuarios">
                <Link href="/users"><Users /><span>Usuarios</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reportes">
                <Link href="/reports"><BarChart /><span>Reportes</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             {/* Add other menu items here */}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <UserMenu />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
          <SidebarTrigger className="sm:hidden" />
          {/* Header content like breadcrumbs or search can go here */}
          <div className="flex-1">
            {/* Potentially add Breadcrumbs or Page Title here */}
          </div>
          {/* Right side actions (e.g., Notifications, Settings) can go here */}
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
