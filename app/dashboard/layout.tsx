
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";


type Props = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: Props) {

  const token = await getToken();


  // 2. Pass it as the third argument to fetchQuery
  const me = await fetchQuery(
    api.user.getCurrentUserWithProfile,
    {},
    { token },
  );

  // 3. Protect the route
  if (!me || !me.user) {
    redirect("/sign-in");
  }

  if (me.profile?.role !== "admin") {
    redirect("/"); // or a 403 page
  }

  return (
    <div className="min-h-screen">

      {children}
    </div>
  );
}
