const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">RemontNaPokriviVarna</p>
        <p className="text-primary-foreground/80">
          © {new Date().getFullYear()} Всички права запазени.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
