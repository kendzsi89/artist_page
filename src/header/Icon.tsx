export default function Icon({ path, link }: { path: string; link: string }) {
  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href={link}>
        <svg
          className="w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d={path} />
        </svg>
      </a>
    </>
  );
}
