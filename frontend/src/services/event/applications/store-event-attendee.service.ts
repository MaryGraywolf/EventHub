import api from "../../../api";
import type { TStoreEventAttendeeRequest } from "../entities/store-event-attendee.request.type";
import type { TStoreEventAttendeeResponse } from "../entities/store-event-attendee.response.type";

export default async function storeEventAttendee({
  eventId,
  ...input
}: TStoreEventAttendeeRequest) {
  const { data } = await api.post<TStoreEventAttendeeResponse>(
    `/events/${eventId}/attendees`,
    input,
  );
  return data;
}
