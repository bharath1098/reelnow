/** Tab-local Studio login — same pattern as Lunar Cafe staff-session. */

const KEY = "reelnow-studio";

export type StudioSessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "worker";
  token: string;
};

/** This tab's studio login. Each browser tab keeps its own role. */
export function saveStudioSession(user: StudioSessionUser) {
  sessionStorage.setItem(KEY, JSON.stringify(user));
  localStorage.removeItem(KEY);
}

export function readStudioSession(): StudioSessionUser | null {
  try {
    const tab = sessionStorage.getItem(KEY);
    if (tab) return JSON.parse(tab) as StudioSessionUser;

    // Older shared login: claim for this tab only, then drop shared copy
    // so other tabs can sign in as a different role.
    const shared = localStorage.getItem(KEY);
    if (!shared) return null;
    sessionStorage.setItem(KEY, shared);
    localStorage.removeItem(KEY);
    return JSON.parse(shared) as StudioSessionUser;
  } catch {
    return null;
  }
}

export function clearStudioSession() {
  sessionStorage.removeItem(KEY);
  localStorage.removeItem(KEY);
}
