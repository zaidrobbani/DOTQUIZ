import type { ReactNode } from "react";
import { verifySession } from "@/repository/auth/dal";
import AuthedShellContainer from "@/feature/protected-shell/container/AuthedShellContainer";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await verifySession();

  return (
    <AuthedShellContainer username={session.username}>
      {children}
    </AuthedShellContainer>
  );
}
