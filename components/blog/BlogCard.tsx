import Image from "next/image";

type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  image: string;
  search?: string;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSnippet(text: string, maxLength = 120) {
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}
function highlight(text: string, search?: string) {
  if (!search?.trim()) return text;

  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-indigo-500/20 text-indigo-300 rounded px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
const BlogCard = ({ title, date, description, image,  search }: BlogCardProps) => {
  const snippet = buildSnippet(stripHtml(description));

  return (
    <article
      className="
        group relative flex flex-col overflow-hidden rounded-3xl
        bg-[#0f172a]/90 backdrop-blur-xl
        border border-white/10
        shadow-2xl shadow-black/40
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-indigo-500/30
      "
    >
      {/* Hero Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

        {/* Date */}
        <span className="absolute bottom-5 left-5 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
          {date}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight font-myanmar leading-myanmar tracking-myanmar line-clamp-2">
          {highlight(title, search)}
        </h3>

        <p className="text-base md:text-lg text-slate-400 font-myanmar leading-myanmar tracking-myanmar line-clamp-3">
          {highlight(snippet, search)}
        </p>

        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-4 py-1.5 text-sm font-medium text-indigo-300">
            Knowledge Sharing
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
