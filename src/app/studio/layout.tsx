import { StudioAuthProvider } from "@/components/studio/StudioAuthProvider";
import { StudioShell } from "@/components/studio/StudioShell";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudioAuthProvider>
      <StudioShell>{children}</StudioShell>
    </StudioAuthProvider>
  );
}
