"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export function UserMenu() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = () => {
        // Simulate logout
        toast({
            title: "Cierre de Sesión",
            description: "Has cerrado sesión exitosamente.",
        });
        router.push("/login");
    };

    // Example user data - replace with actual authenticated user data
    const userName = "Admin User";
    const userEmail = "admin@inventienda.com"; // Updated email domain

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-full justify-start gap-2 px-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
           <Avatar className="h-8 w-8 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
              {/* Replace with actual user image or initials */}
              <AvatarImage src="https://picsum.photos/40/40" alt="User Avatar" />
               <AvatarFallback>{userName?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback> {/* Dynamic initials */}
            </Avatar>
            <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-primary-foreground">{userName}</span>
                <span className="text-xs text-primary-foreground/70">{userEmail}</span>
            </div>

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile"> {/* Link to profile page if it exists */}
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link href="/settings"> {/* Link to settings page if it exists */}
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
             </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
