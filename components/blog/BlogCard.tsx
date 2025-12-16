import Image from "next/image";
interface BlogCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
}
const BlogCard = ({ title, date, description, image }: BlogCardProps) => {
  return (
    <div className="flex flex-col h-full max-w-sm gap-4 p-4 rounded-xl glassmorphism group hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="w-full aspect-video rounded-lg overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw"
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1">
        <p className="text-white text-lg font-bold">{title}</p>
        <p className="text-[#a19db9] text-sm mt-1">{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
