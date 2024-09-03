import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Bell, Bookmark, Home, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./NotificationsButton";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if(!user) return null;

  const unreadNotifications = await prisma.notification.count({
    where: {
        recipientId: user.id,
        read: false
    }
  })

  return (
    <div className={className}>
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
      <NotificationsButton initialState={{unreadCount: unreadNotifications}}/>
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
  );
}
