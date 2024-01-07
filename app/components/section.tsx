import { ReactNode } from 'react';
import { Icon } from './icon';

export default function Section({
  id,
  title,
  description,
  image,
  imageAlt,
  imagePosition,
}: {
  id: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
}) {
  return (
    <section
      className="group relative flex lg:data-[float=left]:flex-row-reverse lg:data-[float=right]:flex-row flex-col items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto py-32 first-of-type:pt-16"
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
        <h2 className="flex flex-col text-5xl font-bold leading-none text-center lg:text-left lg:group-data-[float=right]:text-right">
          {title}
        </h2>
        <p className="text-xl text-zinc-500 group-data-[float=right]:text-right">
          {description}
        </p>
        <a
          href=""
          className="group/button flex items-center justify-center gap-2 text-xl
              text-rose-500"
        >
          <span>Learn More</span>
          <Icon
            name="ArrowRight"
            className="w-6 h-6 group-hover/button:-ml-1 transition-all"
          />
        </a>
      </div>
    </section>
  );
}
