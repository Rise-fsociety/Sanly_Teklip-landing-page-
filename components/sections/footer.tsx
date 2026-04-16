
export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            Loog img
            <span className="text-sm text-muted-foreground">© 2026 SanlyTeklip. All rights reserved.</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
