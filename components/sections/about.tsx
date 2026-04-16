export function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            About Our Mission
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We are dedicated to providing the best tools for developers to build amazing experiences. Our platform is designed with scalability and performance in mind, ensuring your application stays fast even as it grows.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-muted/30 aspect-video flex items-center justify-center">
          <span className="text-muted-foreground text-lg italic">Placeholder for Image/Video</span>
        </div>
      </div>
    </section>
  );
}
