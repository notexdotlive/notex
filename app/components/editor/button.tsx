import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function BubbleButton({
  active,
  title,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  title?: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={twMerge(
        'flex items-center justify-center gap-2 p-2 bg-zinc-200 hover:bg-zinc-300 data-[active=true]:bg-rose-400 data-[active=true]:text-zinc-50 transition-all duration-300',
        className,
      )}
      data-active={active}
    >
      {children}
    </button>
  );
}
