import concerts from "../data/concerts.json";
import { formatConcertDate, upcomingConcerts } from "../data/concerts";

export default function Upcoming() {
  const rows = upcomingConcerts(Array.isArray(concerts) ? concerts : []);
  if (rows.length === 0) return null;

  return (
    <section
      aria-labelledby="upcoming"
      className="flex w-4/5 flex-col items-start pt-10 lg:max-w-180 lg:pt-30"
    >
      <h2
        id="upcoming"
        className="font-(family-name:--lato) mb-3 text-[11px] tracking-[0.14em] uppercase text-(--olive)"
      >
        Upcoming
      </h2>
      <ul className="flex w-full list-none flex-col gap-4 p-0">
        {rows.map((concert) => (
          <li key={`${concert.date}-${concert.venue}`}>
            <time dateTime={concert.date} className="font-(family-name:--playfair)">
              {formatConcertDate(concert.date)}
            </time>
            <p>
              {concert.city}
              {" · "}
              {concert.url ? (
                <a
                  href={concert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  {concert.venue}
                </a>
              ) : (
                concert.venue
              )}
            </p>
            {concert.programme ? <p>{concert.programme}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
