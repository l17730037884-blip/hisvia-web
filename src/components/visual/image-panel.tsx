import { DecoratedImage } from "@/components/visual/decorated-image";

export function ImagePanel({
  src,
  alt = "",
  className,
  imgClassName,
  ratio = "4/3",
  fit = "cover",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  fit?: "cover" | "contain" | "natural";
  priority?: boolean;
}) {
  return (
    <DecoratedImage
      src={src}
      alt={alt}
      className={className}
      imgClassName={imgClassName}
      ratio={ratio}
      fit={fit}
      priority={priority}
    />
  );
}
