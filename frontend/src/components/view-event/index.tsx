import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import viewEvent from "../../services/event/applications/view-event.service";
import indexEventAttendees from "../../services/event/applications/index-event-attendees.service";
import DetailsInfoCard from "./details-info-card";
import AttendeesInfoCard from "./attendees-info-card";
import RegisterInfoCard from "./register-info-card";

export default function ViewEvent() {
  const { id } = useParams();

  const { isLoading: isViewEventLoading, data: viewEventData } = useQuery({
    queryKey: ["view-event", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Event ID is required");
      }

      return viewEvent({ id });
    },
  });

  const {
    isLoading: isIndexEventAttendeesLoading,
    data: indexEventAttendeesData,
  } = useQuery({
    queryKey: ["index-event-attendees", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Event ID is required");
      }

      return indexEventAttendees({ eventId: id });
    },
  });

  if (
    !id ||
    isViewEventLoading ||
    !viewEventData ||
    isIndexEventAttendeesLoading ||
    !indexEventAttendeesData
  ) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">
        {viewEventData.event.title}
      </h2>
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-4">
          <DetailsInfoCard event={viewEventData.event} />
          <AttendeesInfoCard
            event={viewEventData.event}
            attendees={indexEventAttendeesData.attendees}
          />
        </div>
        <RegisterInfoCard eventId={id} />
      </div>
    </>
  );
}
