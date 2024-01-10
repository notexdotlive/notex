import { ReactNode } from 'react';
import { Icon } from './icon';

export default function Section({
  id,
  title,
  description,
  image,
  imageAlt,
  imagePosition,
  actionText = 'Learn More',
  href,
  children,
}: {
  id: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  actionText?: string;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`group relative flex lg:data-[float=left]:flex-row-reverse lg:data-[float=right]:flex-row flex-col items-center ${
        image ? 'justify-between' : 'justify-center'
      } gap-8 sm:gap-16 lg:gap-4 w-full max-w-screen-hd h-full mx-auto py-12 md:py-24 md:first-of-type:pt-12`}
      id={id}
      data-float={imagePosition}
    >
      {image && (
        <picture className="relative flex flex-1 items-center justify-center min-w-96 w-full h-full">
          <img
            src={image}
            alt={imageAlt}
            className="w-auto h-full object-contain pointer-events-none select-none"
          />
        </picture>
      )}

      <div className="flex flex-col items-center lg:items-start lg:group-data-[float=right]:items-end gap-6 w-full max-w-xl h-full">
        <h2 className="flex flex-col text-subtitle font-bold leading-none text-center lg:text-left lg:group-data-[float=right]:text-right w-full">
          {title}
        </h2>
        <p className="text-base sm:text-xl text-zinc-500 text-center lg:text-left lg:group-data-[float=right]:text-right">
          {description}
        </p>
        <a
          href={href}
          className="group/button flex items-center justify-center lg:justify-start lg:group-data-[float=right]:justify-end gap-2 text-xl w-full text-rose-500"
        >
          <span>
            {actionText} <span className="sr-only">about {title}</span>
          </span>
          <Icon
            name="ArrowRight"
            className="w-6 h-6 group-hover/button:-ml-1 transition-all"
          />
        </a>
      </div>

      {children}
    </section>
  );
}
