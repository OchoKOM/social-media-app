import { ChannelList } from "stream-chat-react";
import { useSession } from "../SessionProvider";

export default function ChatSideBar() {
  const { user } = useSession();

  return (
    <div className="flex size-full flex-col border-e md:w-72">
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
      />
    </div>
  );
}
