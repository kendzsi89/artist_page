const Footer = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20 pb-12 text-sm text-[var(--muted)] flex justify-between">
      <span>© {new Date().getFullYear()}</span>
      <span>Designed and built with care in Copenhagen</span>
    </div>
  );
};

export default Footer;