import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from "@/lib/blog";
import { MDXRenderer } from "@/components/blog/MDXRenderer";
import { BlogCard } from "@/components/blog/BlogCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = await getRelatedBlogs(slug, blog.tags);

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <ReadingProgress />
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <Button variant="ghost" className="gap-2 group pl-0" asChild>
                        <Link href="/blogs">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Blogs
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="glass rounded-full">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>

                {/* Hero Header */}
                <header className="space-y-6 text-center">
                    <div className="flex justify-center gap-3">
                        {blog.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="glass">{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-medium text-white">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(blog.publishDate), "MMMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>10 min read</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-3xl overflow-hidden glass border-white/10 shadow-3xl">
                    <img
                        src={blog.thumbnailImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* Content */}
                <article className="glass p-8 md:p-12 rounded-3xl">
                    <MDXRenderer content={blog.content} />
                </article>

                {/* Related Blogs */}
                {relatedBlogs.length > 0 && (
                    <section className="space-y-8 pt-12 border-t border-white/5">
                        <h2 className="text-3xl font-bold tracking-tight">Related Explorations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedBlogs.map(rb => (
                                <BlogCard key={rb.slug} blog={rb} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
