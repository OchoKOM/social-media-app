import { Metadata } from "next";
import Notifications from "./Notifications";
import TrendsSidebar from "@/components/TrendsSidebar";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">Centre d&apos;activités</h2>
        </div>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
}