import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { ComingSoonPage } from "@/components/common/ComingSoonPage";

export const Route = createFileRoute("/insurance/")({
  head: () => ({ meta: [{ title: "Insurance — MedCore" }] }),
  component: () => (
    <ComingSoonPage
      title="Insurance Claims"
      subtitle="Pre-auth · claims · denial management"
      icon={Shield}
      blurb="ICD/CPT coding, AI claim validation, and denial appeals are coming in Phase 2."
    />
  ),
});
