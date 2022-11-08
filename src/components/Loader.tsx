type LoaderProps = {
  children: React.ReactNode;
};

export function Loader({ children }: LoaderProps) {
  return (
    <div className="inset-0 h-screen w-screen fixed z-10 bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
      <div className="p-4 text-lg bg-white opacity-100 rounded">{children}</div>
    </div>
  );
}
