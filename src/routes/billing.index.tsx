import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { ComingSoonPage } from "@/components/common/ComingSoonPage";

export const Route = createFileRoute("/billing/")({
  head: () => ({ meta: [{ title: "Billing — MedCore" }] }),
  component: () => (
    <ComingSoonPage
      title="Billing"
      subtitle="Invoices · payments · revenue"
      icon={Receipt}
      blurb="Invoice generation with insurance deductions, payment tracking with aging buckets, and PDF letterhead are coming in Phase 2."
    />
  ),
});
