/** Format seconds as "1ч 23м 05с" / "12м 05с" / "45с". */
export const formatDuration = (seconds: number): string => {
  const s = Math.max(0, Math.round(seconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h) return `${h}ч ${String(m).padStart(2, "0")}м ${String(sec).padStart(2, "0")}с`;
  if (m) return `${m}м ${String(sec).padStart(2, "0")}с`;
  return `${sec}с`;
};
