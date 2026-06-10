import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth, roleHome } from "@/store/auth";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "MedCore — Hospital Management" }] }),
  component: Index,
});

function Index() {
  const user = useAuth((s) => s.user);
  return <Navigate to={user ? roleHome[user.role] : "/login"} />;
}
