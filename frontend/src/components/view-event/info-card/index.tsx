import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/styles";

type TProps = { title: string } & HTMLAttributes<HTMLDivElement>;

export default function InfoCard({
  children,
  title,
  className,
  ...props
}: TProps) {
  return (
    <div
      className={cn(
        "w-full px-6 py-5 border border-neutral-200 rounded-xl shadow flex flex-col gap-2",
        className,
      )}
      {...props}
    >
      <h3 className="text-neutral-600 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}
