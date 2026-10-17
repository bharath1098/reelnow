function cleanId(id?: string | null): string | null {
  if (!id) return null;
  const match = id.match(/[\w-]{11}/);
  return match?.[0] ?? null;
}

export function extractYoutubeId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^[\w-]{11}$/.test(value)) return value;

  const fromPattern = value.match(
    /(?:youtu\.be\/|youtube\.com\/(?:shorts|embed|live|v)\/|youtube\.com\/watch\?.*?v=|youtube-nocookie\.com\/embed\/)([\w-]{11})/i
  );
  if (fromPattern?.[1]) return fromPattern[1];

  const withProto = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProto);
    const host = url.hostname.replace(/^(www|m)\./, "");
    if (host === "youtu.be") {
      return cleanId(url.pathname.split("/").filter(Boolean)[0]);
    }
    if (
      host === "youtube.com" ||
      host === "music.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      const parts = url.pathname.split("/").filter(Boolean);
      if (
        parts[0] === "shorts" ||
        parts[0] === "embed" ||
        parts[0] === "live" ||
        parts[0] === "v"
      ) {
        return cleanId(parts[1]);
      }
      return cleanId(url.searchParams.get("v"));
    }
  } catch {
    return cleanId(value);
  }
  return null;
}

export function youtubePoster(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
