import { SectionHead, PrimaryButton, PlaceholderPhoto } from "./ui";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

interface PageShellProps {
  locale: Locale;
  pageKey: string;
  imagePrompt?: string;
}

export default function PageShell({ locale, pageKey, imagePrompt }: PageShellProps) {
  const base = `/${locale}`;
  const t = pageT[locale];
  const page = pageKey.includes('.') 
    ? pageKey.split('.').reduce((o: any, k: string) => o[k], t) 
    : (t as any)[pageKey];
  const { kicker, title, desc } = page;
  
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className={imagePrompt ? 'grid gap-10 md:grid-cols-[1fr_1fr]' : ''}>
            <div className="flex flex-col justify-center">
              <SectionHead kicker={kicker} title={title} description={desc} />
            </div>
            {imagePrompt && (
              <PlaceholderPhoto
                caption={kicker}
                prompt={imagePrompt}
                alt={title}
                imageSize="landscape_4_3"
                className="aspect-[4/3] min-h-[260px] rounded-sm card-elevated"
              />
            )}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-wrap px-8">
          <PrimaryButton href={`${base}${routes.request}`}>
            {t.common.submitReqBtn}
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
