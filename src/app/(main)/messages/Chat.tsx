"use client"

import { Loader2 } from "lucide-react";
import useInitializeChatClient from "./useInitializeChatClient";
import {Chat as StreamChat} from "stream-chat-react";
import ChatSideBar from "./ChatSideBar";
import ChatChannel from "./ChatChannel";


export default function Chat() {
    const chatClient = useInitializeChatClient();

    if(!chatClient){
        return <Loader2 className="mx-auto my-4 animate-spin"/>
    }
    return <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="absolute bottom-0 top-0 flex w-full">
            <StreamChat 
            client={chatClient}
            >
                <ChatSideBar/>
                <ChatChannel/>
            </StreamChat>
        </div>
    </main>
};
