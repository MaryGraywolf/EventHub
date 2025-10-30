import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../api/query-client";
import Header from "../../components/header";
import Introduction from "../../components/events/introduction";
import Events from "../../components/events";

export default function EventsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <Header />
        <main className="max-w-7xl px-6 py-12 mx-auto flex flex-col gap-8">
          <Introduction />
          <hr className="border-none h-px bg-neutral-200" />
          <Events />
        </main>
      </section>
    </QueryClientProvider>
  );
}
