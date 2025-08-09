export default function Icon({
  path,
  link,
  svgStyles,
  aStyles,
}: {
  path: string;
  link?: string;
  svgStyles?: string;
  aStyles?: string;
}) {
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className={aStyles}
      >
        <svg
          className={`fill-(--highlight) ${svgStyles}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          preserveAspectRatio="none"
        >
          <path d={path} />
        </svg>
      </a>
    </>
  );
}
