import Image from "next/image";
type BlogCardProps = {
  title: string;
  date: string;
  description: string;
  image: string;
  search?: string;
};
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSnippet(text: string, query: string, maxLength = 160): string {
  const trimmed = query.trim();
  if (!trimmed) {
    return text.slice(0, maxLength) + (text.length > maxLength ? "…" : "");
  }

  const lower = text.toLowerCase();
  const q = trimmed.toLowerCase();
  const idx = lower.indexOf(q);

  // If no match, fall back to start
  if (idx === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? "…" : "");
  }

  const context = Math.floor((maxLength - q.length) / 2);
  const start = Math.max(0, idx - context);
  const end = Math.min(text.length, start + maxLength);

  let snippet = text.slice(start, end);
  if (start > 0) snippet = "…" + snippet;
  if (end < text.length) snippet = snippet + "…";
  return snippet;
}

function highlight(text: string, search?: string) {
  const trimmed = (search ?? "").trim();
  if (!trimmed) return text;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-400/30 text-yellow-100 rounded px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const BlogCard = ({
  title,
  date,
  description,
  image,
  search,
}: BlogCardProps) => {
  const plainDescription = stripHtml(description);
  const snippet = buildSnippet(plainDescription, search ?? "", 140); // ~one line

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

      <div>
        <p className="text-white text-lg font-bold">
          {highlight(title, search)}
        </p>

        {/* Short, clean snippet, not full HTML */}
        <p className="text-[#a19db9] text-sm mt-1">
          {highlight(snippet, search)}
        </p>

        <p className="text-[#a19db9] text-xs mt-2">{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
