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
      <mark
        key={i}
        className="text-primary-300 underline underline-offset-2 decoration-primary-500/70"
      >
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
    <div className="flex flex-col h-full w-full gap-3 p-4 rounded-xl glassmorphism group hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
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

      <div className="mt-1 flex flex-col gap-1">
        <p className="text-white text-base sm:text-lg font-semibold leading-snug line-clamp-2">
          {highlight ? highlight(title, search) : title}
        </p>

        <p className="text-[#a19db9] text-xs sm:text-sm leading-relaxed line-clamp-2">
          {highlight ? highlight(snippet, search) : snippet}
        </p>

        <p className="text-[#7b7694] text-[11px] sm:text-xs mt-1">{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
