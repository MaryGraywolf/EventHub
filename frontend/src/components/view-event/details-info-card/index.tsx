import type { TEvent } from "../../../services/event/entities/event.type";
import InfoCard from "../info-card";

type TProps = { event: TEvent };

export default function DetailsInfoCard({ event }: TProps) {
  return (
    <InfoCard title="Detalhes">
      <p className="text-neutral-600 mb-5">{event.details}</p>
    </InfoCard>
  );
}
