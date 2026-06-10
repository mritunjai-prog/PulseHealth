import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";

export const Route = createFileRoute("/billing/$subsection")({
  component: () => {
    const { subsection } = Route.useParams();
    const title = subsection.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return (
      <AppShell>
        <PageHeader title={title} subtitle="Module in development" />
        <div className="card-soft p-12 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h3 className="text-xl font-bold mb-2">{title} - Coming Soon</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            This section is currently being integrated with the real-time NestJS backend. 
            Check back soon for the full release of this module.
          </p>
        </div>
      </AppShell>
    );
  },
});
