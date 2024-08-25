"use client"

import { useSession } from "@/app/(main)/SessionProvider"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuSubContent
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface UserButtonProps {
    className?: string
}

export default function UserButton({ className }: UserButtonProps) {
    const { user } = useSession();

    const { theme, setTheme } = useTheme();


    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className={cn("flex-none rounded-full", className)} title="Profil">
                <UserAvatar avatarUrl={user.avatarUrl} size={40} />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Connecté(e) en tant que @{user.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/users/${user.username}`}>
                <DropdownMenuItem>
                    <UserIcon className="mr-2 size-4" />
                    Profil
                </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Monitor className="mr-2 size-4" />
                    Thême
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={()=>{setTheme("system")}}>
                            <Monitor className="mr-2 size-4" />
                            Système (défaut)
                            {theme === "system" && <Check className="ms-2 size-4"/>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setTheme("light")}}>
                            <Sun className="mr-2 size-4" />
                            Clair
                            {theme === "light" && <Check className="ms-2 size-4"/>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{setTheme("dark")}}>
                            <Moon className="mr-2 size-4" />
                            Sombre
                            {theme === "dark" && <Check className="ms-2 size-4"/>}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
                logout()
            }}>
                <LogOutIcon className="mr-2 size-4" />
                Deconnexion
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

};
