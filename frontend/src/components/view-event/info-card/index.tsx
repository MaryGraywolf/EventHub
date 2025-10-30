import type { ReactNode } from "react";

type TProps = { title: string; children: ReactNode };

export default function InfoCard({ children, title }: TProps) {
  return (
    <div className="w-full px-6 py-5 border border-neutral-200 rounded-xl shadow flex flex-col gap-2">
      <h3 className="text-neutral-600 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}
