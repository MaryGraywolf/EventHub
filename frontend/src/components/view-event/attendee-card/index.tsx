import MailOutlineIcon from "@mui/icons-material/MailOutline";
import type { TAttendee } from "../../../services/event/entities/attendee.type";

type TProps = { attendee: TAttendee };

export default function AttendeeCard({ attendee }: TProps) {
  return (
    <article className="px-3.5 py-2.5 border border-neutral-200 rounded-md shadow flex flex-col gap-1">
      <h4 className="text-sm font-semibold">{attendee.name}</h4>
      <p className="text-neutral-600 text-sm flex items-center gap-1">
        <MailOutlineIcon fontSize="small" />
        <span className="font-semibold">{attendee.email}</span>
      </p>
    </article>
  );
}
