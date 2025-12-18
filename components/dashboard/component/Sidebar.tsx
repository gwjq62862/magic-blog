"use client";
import { ArrowLeft, LayoutDashboard, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();

  // Icons...
  const dashboardicon = <LayoutDashboard size={20} />;
  const usersicon = <User size={20} />;
  const createicon = <Plus size={20} />;

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: dashboardicon,
      active: pathname === "/dashboard",
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: usersicon,
      active: pathname.includes("/users"),
    },
    {
      name: "New Post",
      path: "/dashboard/createBlog",
      icon: createicon,
      active: pathname.includes("createBlog"),
    },
    {
      name:"Exist",
      path:"/",
      icon:<ArrowLeft size={20}/>,
      active:false,
    }
  ];

  return (
    <>
      <aside className="w-64 bg-[#0f0e13]/90 border-r border-[#2a253d] overflow-y-auto">
        <nav className="pt-6">
          {sidebarLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-6 py-3 mx-3 rounded-lg transition ${
                item.active
                  ? "bg-primary/20 text-primary"
                  : "text-[#a19db9] hover:bg-[#1b1829]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
