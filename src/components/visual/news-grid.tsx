import Link from "next/link";
import { DecoratedImage } from "@/components/visual/decorated-image";

export type NewsCard = {
  image: string;
  badge: string;
  title: string;
  region?: string;
  href: string;
  regionHref?: string;
};

export function NewsGrid({ items }: { items: NewsCard[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="min-w-0 animate-fade-in-up card-hover"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="relative mb-3 card-shadow rounded-img">
            <Link href={item.href} className="block">
              <DecoratedImage
                src={item.image}
                alt={item.title}
                ratio="4 / 3"
                fit="contain"
              />
            </Link>
            <div className="absolute bottom-0 start-0 z-20 bg-accent px-2.5 py-1.5 text-[0.6875rem] font-medium leading-[1.5] tracking-[-0.01em] text-white">
              <span>{item.badge}</span>
            </div>
          </div>
          <h3 className="text-[1.125rem] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
            <Link href={item.href} className="transition-opacity hover:opacity-70">
              {item.title}
            </Link>
          </h3>
          {item.region ? (
            <span className="mt-3 block text-[0.8125rem] font-medium leading-[1.5] tracking-[-0.02em]">
              {item.regionHref ? (
                <Link href={item.regionHref} className="text-accent transition-opacity hover:opacity-70">
                  {item.region}
                </Link>
              ) : (
                <span className="text-accent">{item.region}</span>
              )}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
