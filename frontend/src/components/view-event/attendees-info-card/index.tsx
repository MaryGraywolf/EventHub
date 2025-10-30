import PeopleIcon from "@mui/icons-material/People";
import InfoCard from "../info-card";
import AttendeeCard from "./attendee-card";
import type { TEvent } from "../../../services/event/entities/event.type";
import type { TAttendee } from "../../../services/event/entities/attendee.type";

type TProps = { event: TEvent; attendees: TAttendee[] };

export default function AttendeesInfoCard({ event, attendees }: TProps) {
  function renderAttendees(attendees: TAttendee[]) {
    if (attendees.length === 0) {
      return (
        <li>
          <p className="text-neutral-600 text-sm">
            Nenhum participante registrado
          </p>
        </li>
      );
    }

    return attendees.map((attendee) => (
      <li key={`attendee-${attendee.id}`}>
        <AttendeeCard attendee={attendee} />
      </li>
    ));
  }

  return (
    <InfoCard title="Participantes">
      <p className="text-sm flex items-center gap-2">
        <PeopleIcon fontSize="small" className="text-neutral-600" />
        <span>
          {event.attendeesAmount}/{event.maximunAttendees} registrados
        </span>
      </p>
      <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {renderAttendees(attendees)}
      </ul>
    </InfoCard>
  );
}
