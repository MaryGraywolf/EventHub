import { useQuery } from "@tanstack/react-query";
import indexEvents from "../../services/event/applications/index-events.service";
import EventCard from "./event-card";
import type { TEvent } from "../../services/event/entities/event.type";

export default function Events() {
  const { isLoading, data } = useQuery({
    queryKey: ["index-events"],
    queryFn: indexEvents,
  });

  if (isLoading || !data) {
    return <p>Carregando...</p>;
  }

  function renderEvents(events: TEvent[]) {
    if (events.length === 0) {
      return (
        <li>
          <p className="text-neutral-600">Nenhum evento encontrado</p>
        </li>
      );
    }

    return events.map((event) => (
      <li key={event.id}>
        <EventCard event={event} />
      </li>
    ));
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Eventos</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {renderEvents(data.events)}
      </ul>
    </div>
  );
}
