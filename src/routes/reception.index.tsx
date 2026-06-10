import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { ComingSoonPage } from "@/components/common/ComingSoonPage";

export const Route = createFileRoute("/reception/")({
  head: () => ({ meta: [{ title: "Reception — MedCore" }] }),
  component: () => (
    <ComingSoonPage
      title="Front Desk"
      subtitle="Appointments · registrations · walk-in queue"
      icon={Calendar}
      blurb="Weekly calendar, token board, patient registration wizard, and fuzzy patient search are coming in Phase 2."
    />
  ),
});
