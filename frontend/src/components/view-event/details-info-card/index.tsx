import type { HTMLAttributes } from "react";
import type { TEvent } from "../../../services/event/entities/event.type";
import InfoCard from "../info-card";

type TProps = { event: TEvent } & HTMLAttributes<HTMLDivElement>;

export default function DetailsInfoCard({ event, ...props }: TProps) {
  return (
    <InfoCard title="Detalhes" {...props}>
      <p className="text-neutral-600 mb-5">{event.details}</p>
    </InfoCard>
  );
}
