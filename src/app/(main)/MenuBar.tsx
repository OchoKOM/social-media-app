import { Button } from "@/components/ui/button"
import { Bell, Bookmark, Home, MessageCircleMore } from "lucide-react"
import Link from "next/link"

interface MenuBarProps {
    className?: string
}

export default function MenuBar({ className }: MenuBarProps) {
    return <div className={className}>
        <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Accueil"
            asChild
        >
            <Link href="/">
                <Home />
                <span className="hidden lg:inline">Accueil</span>
            </Link>
        </Button>
        <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Notifications"
            asChild
        >
            <Link href="/notifications">
                <Bell />
                <span className="hidden lg:inline">Notifications</span>
            </Link>
        </Button>
        <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Messages"
            asChild
        >
            <Link href="/messages">
                <MessageCircleMore />
                <span className="hidden lg:inline">Messages</span>
            </Link>
        </Button>
        <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Favoris"
            asChild
        >
            <Link href="/bookmarks">
                <Bookmark />
                <span className="hidden lg:inline">Favoris</span>
            </Link>
        </Button>
    </div>
};
