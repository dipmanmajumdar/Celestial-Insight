import { getAllBlogs } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { SparklesCore } from "@/components/aceternity/Sparkles";

export default async function BlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen relative">
            <div className="absolute inset-0 z-0">
                <SparklesCore
                    id="blogs-bg"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={50}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-12">
                <header className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        EXPLORE THE <span className="text-gradient">COSMOS</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        In-depth articles, research summaries, and conceptual breakdowns of the most fascinating astrophysical phenomena.
                    </p>
                </header>

                <BlogList blogs={blogs} />
            </div>
        </div>
    );
}
