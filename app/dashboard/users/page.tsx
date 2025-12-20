"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

// Dashboard pages must be dynamic due to authentication requirements
export const dynamic = "force-dynamic";

export default function UsersPage() {
  const profiles = useQuery(api.user.listProfiles);
  const updateRole = useMutation(api.user.updateUserRole);

  if (profiles === undefined) {
    return <div className="p-6 text-[#a19db9]">Loading users…</div>;
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-white">Users</h1>

      <div className="mt-4 divide-y divide-[#1e1a2e] rounded-xl bg-[#141220]">
        {profiles.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between px-4 py-3"
          >
            {/* Left: avatar + name */}
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full overflow-hidden bg-[#1d1930]">
                {user.profileImage && (
                  <Image
                    src={user.profileImage}
                    alt={user.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-[#7b7694] mt-1">
                  {new Date(user._creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right: role select */}
            <select
              value={user.role}
              onChange={(e) =>
                updateRole({
                  profileId: user._id,
                  role: e.target.value as "user" | "admin",
                })
              }
              className="rounded-md bg-[#1d1930] text-xs text-white px-2 py-1 border border-[#2b2340]"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </main>
  );
}
