export type Concert = {
  date: string;
  city: string;
  venue: string;
  programme?: string;
  url?: string;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isConcert(value: unknown): value is Concert {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
    typeof entry.city === "string" &&
    entry.city.length > 0 &&
    typeof entry.venue === "string" &&
    entry.venue.length > 0
  );
}

export function todayISO(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function formatConcertDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

export function upcomingConcerts(entries: unknown[], today = todayISO()) {
  return entries
    .filter(isConcert)
    .filter((entry) => entry.date >= today)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
