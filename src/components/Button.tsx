import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
};

export function Button({
  className,
  onClick,
  children,
  isDisabled = false,
}: ButtonProps) {
  return (
    <button
      className={twMerge(`rounded py-1 px-2 text-xs ${className}`)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
