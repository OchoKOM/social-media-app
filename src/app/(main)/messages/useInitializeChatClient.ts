import { useEffect, useState } from "react";
import { useSession } from "../SessionProvider";
import { StreamChat } from "stream-chat";
import kyInstance from "@/lib/ky";



export default function useInitializeChatClient() {
    const { user } = useSession();

    const [chatClient, setChatClient] = useState<StreamChat| null>(null);

    useEffect(()=>{
        const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

        client.connectUser(
            {
                id: user.id,
                username: user.username,
                name: user.displayName,
                image: user.avatarUrl,
            },
            async ()=> kyInstance.get('/api/get-token')
            .json<{token: string}>()
            .then(data=>data.token)
        )
        .catch(error=>console.error("Echec de connexion de l'utilisateur", error))
        .then(()=>setChatClient(client));

        return ()=>{
            setChatClient(null);
            client.disconnectUser()
            .catch(error=>console.error("Echec de déconnexion de l'utilisateur", error))
            .then(()=>console.log("Connection fermée")
            );
        }
    }, [user.id, user.username, user.displayName, user.avatarUrl,]);

    return chatClient;
};
