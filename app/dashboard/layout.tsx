import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import DashboardSidebar from "@/components/dashboard/component/Sidebar";
import { DashboardHeader } from "@/components/dashboard/component/DashboardHeader";

interface UserProfile {
  authUserId: string;
  name: string;
  profileImage: string;
  role: string;
  createdAt: number;
  _id: string;
  _creationTime: number;
}

interface AuthUser {
  _id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: number;
  updatedAt: number;
  _creationTime: number;
}
type Props = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const token = await getToken();

  const me = await fetchQuery(
    api.user.getCurrentUserWithProfile,
    {},
    { token }
  );

  if (!me || !me.user) {
    redirect("/sign-in");
  }

  if (me.profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0e13] to-[#1a1622] flex flex-col">
      <DashboardHeader me={me as { user: AuthUser; profile: UserProfile }} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
