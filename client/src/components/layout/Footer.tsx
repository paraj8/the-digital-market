function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
        <p className="text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} The Digital Market. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;