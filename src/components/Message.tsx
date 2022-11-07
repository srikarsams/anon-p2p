import { twMerge } from 'tailwind-merge';

type MessageProps = {
  children: React.ReactNode;
  className: string;
};

export function Message({ children, className }: MessageProps) {
  return (
    <div
      className={twMerge(
        `bg-gray-200 rounded self-end p-2 text-sm ${className}`
      )}
    >
      {children}
    </div>
  );
}
