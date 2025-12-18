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

interface Props {
  me: {
    user: AuthUser;
    profile: UserProfile;
  };
}
export const DashboardHeader = ({ me }: Props) => (
  <div className="h-16 flex items-center justify-between px-6 border-b border-[#2a253d] bg-[#0f0e13]">
    <div className="text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
      Magic Mind
    </div>
    <div className="flex items-center gap-4 text-[#a19db9]">
      <span className="text-sm">Hi, {me.profile.name}</span>
      <button className="px-4 py-2 bg-primary/20 rounded-lg text-sm">
        Logout
      </button>
    </div>
  </div>
);
