import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const imageVariants = cva("inline-block aspect-auto", {
  variants: {
    variant: {
      default:
        "rounded-sm bg-secondary shadow-[10px_10px_0px_hsl(var(--primary))]",
      rounded:
        "rounded-full bg-secondary shadow-[10px_10px_0px_hsl(var(--primary))]",
      square:
        "rounded-none bg-secondary shadow-[10px_10px_0px_hsl(var(--primary))]",
    },
    size: {
      default: "h-auto w-auto",
      sm: "h-24 w-24",
      md: "h-32 w-32",
      lg: "h-48 w-48",
      full: "h-full w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
  fallback?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, variant, size, src, alt, fallback, ...props }, ref) => {
    const [imageSrc, setImageSrc] = React.useState(src);

    React.useEffect(() => {
      setImageSrc(src);
    }, [src]);

    const handleError = () => {
      if (fallback) {
        setImageSrc(fallback);
      }
    };

    return (
      <img
        className={cn(imageVariants({ variant, size, className }))}
        ref={ref}
        src={imageSrc}
        alt={alt}
        onError={handleError}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";

export { Image, imageVariants };
