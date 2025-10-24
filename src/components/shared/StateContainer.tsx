interface StateContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function StateContainer({
  children,
  className = "flex justify-center items-center py-20",
}: StateContainerProps) {
  return (
    <div className={className}>
      <div className="text-center">{children}</div>
    </div>
  );
}
