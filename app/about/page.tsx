import { SparklesCore } from "@/components/aceternity/Sparkles";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Microscope, Rocket } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <SparklesCore
                    id="about-bg"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={40}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="max-w-5xl mx-auto space-y-16 relative z-10">
                <section className="text-center space-y-6">
                    <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 text-sm">My Mission</Badge>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">
                        EXPLORING THE <br /><span className="text-gradient">INFINITE</span>
                    </h1>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                        I created Celestial Insight because I believe the universe's most complex secrets should be accessible to everyone who looks up and asks "Why?".
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="glass p-10 rounded-3xl space-y-6 hover:border-primary/50 transition-all group">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <GraduationCap className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <h3 className="text-3xl font-bold">Scientific Curiosity</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            I dive deep into established physical theories and new discoveries, making sure that every story I tell is grounded in the awe-inspiring reality of our universe.
                        </p>
                    </div>

                    <div className="glass p-10 rounded-3xl space-y-6 hover:border-primary/50 transition-all group">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                            <Microscope className="w-8 h-8 text-indigo-400 group-hover:text-white" />
                        </div>
                        <h3 className="text-3xl font-bold">Personal Research</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Whether it's the latest from the James Webb Telescope or a thought experiment on time dilation, I share the things that keep me awake at night with wonder.
                        </p>
                    </div>
                </div>

                <section className="glass rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-primary/20 shrink-0">
                        <img src="/images/me.jpg" alt="Me" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold">The Mind Behind the Blog</h2>
                        <p className="text-muted-foreground text-lg">
                            I'm a passionate explorer of the cosmos, building this space to document my own learning journey and share the breathtaking beauty of astrophysics with you.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="flex items-center gap-2 text-sm text-primary">
                                <Rocket className="w-4 h-4" /> Personal Project
                            </div>
                            <div className="flex items-center gap-2 text-sm text-indigo-400">
                                <User className="w-4 h-4" /> Independent Learner
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
