import Skeleton from "../Skeleton";

const NavbarSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Login button skeleton */}
      <Skeleton className="h-9 w-20 rounded-full hidden sm:block" />

      {/* Signup button skeleton */}
      <Skeleton className="h-9 w-24 rounded-full" />
    </div>
  );
};

export default NavbarSkeleton;
