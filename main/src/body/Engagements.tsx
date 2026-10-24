import { sectionLabelClass } from "./Section";

const offerings = [
  "Solo recital",
  "Chamber music",
  "Masterclass",
  "Piano tuition",
];

export default function Engagements() {
  return (
    <section
      aria-labelledby="engagements"
      className="flex w-4/5 flex-col items-start pt-10 lg:max-w-180 lg:pt-30"
    >
      <h2 id="engagements" className={sectionLabelClass}>
        Engagements
      </h2>
      <ul className="sheet grid w-full list-none gap-3 p-0 md:grid-cols-2">
        {offerings.map((item) => (
          <li
            key={item}
            className="font-(family-name:--lato) text-base text-(--ink) lg:text-lg"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
