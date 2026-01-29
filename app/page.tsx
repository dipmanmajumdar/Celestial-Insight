import Link from "next/link";
import { SparklesCore } from "@/components/aceternity/Sparkles";
import { Button } from "@/components/ui/button";
import { ArrowRight, Telescope, Atom, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* Hero Section */}
      <div className="h-[90vh] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 tracking-tighter">
            CELESTIAL <br /> <span className="text-gradient">INSIGHT</span>
          </h1>
          <div className="w-[40rem] h-10 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>

          <p className="text-center mt-4 text-muted-foreground text-lg max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            I built this space to share my fascination with the cosmos. From the subatomic dance of particles to the grand evolution of galaxies, follow my journey as I explore the mysteries of our universe.
          </p>

          <div className="flex gap-4 mt-10">
            <Button size="lg" className="rounded-full gap-2 cosmic-glow-hover" asChild>
              <Link href="/blogs">
                Explore My Blogs <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2 glass" asChild>
              <Link href="/about">
                Why I Built This <Telescope className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Atom className="w-4 h-4" /> My Motive
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Sharing the <span className="text-primary text-gradient">Invisible</span></h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Astrophysics shouldn't be confined to research papers. My goal is to bridge the gap between complex science and everyone who looks up at the stars and wonders. I break down profound concepts so we can all learn together.
          </p>
          <ul className="space-y-4">
            {["Relativistic Physics", "Cosmological Models", "My Learning Journey"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative glass p-8 rounded-2xl space-y-4 min-h-[300px] flex flex-col justify-center items-center text-center">
            <Rocket className="w-16 h-16 text-primary mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold">Interactive Learning</h3>
            <p className="text-muted-foreground">Experimenting with ways to visualize the phenomena that define our reality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
