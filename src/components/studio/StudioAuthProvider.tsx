"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearStudioSession,
  readStudioSession,
  saveStudioSession,
  type StudioSessionUser,
} from "@/lib/studio-session";

type Ctx = {
  user: StudioSessionUser | null;
  ready: boolean;
  token: string | null;
  signOut: () => void;
  setUser: (user: StudioSessionUser) => void;
};

const StudioAuthContext = createContext<Ctx>({
  user: null,
  ready: false,
  token: null,
  signOut: () => undefined,
  setUser: () => undefined,
});

export function StudioAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUserState] = useState<StudioSessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUserState(readStudioSession());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!user && pathname?.startsWith("/studio")) {
      router.replace("/login?next=/studio");
    }
  }, [ready, user, pathname, router]);

  const setUser = useCallback((next: StudioSessionUser) => {
    saveStudioSession(next);
    setUserState(next);
  }, []);

  const signOut = useCallback(() => {
    clearStudioSession();
    setUserState(null);
    router.replace("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      ready,
      token: user?.token ?? null,
      signOut,
      setUser,
    }),
    [user, ready, signOut, setUser],
  );

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-noir font-sans text-sm text-silver">
        Loading studio…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-noir font-sans text-sm text-silver">
        Redirecting to sign in…
      </div>
    );
  }

  return (
    <StudioAuthContext.Provider value={value}>
      {children}
    </StudioAuthContext.Provider>
  );
}

export function useStudioAuth() {
  return useContext(StudioAuthContext);
}

/** Hidden field so server actions receive this tab's token. */
export function StudioTokenField() {
  const { token } = useStudioAuth();
  if (!token) return null;
  return <input type="hidden" name="_studioToken" value={token} />;
}
