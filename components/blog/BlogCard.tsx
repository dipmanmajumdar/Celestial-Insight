"use client";

import Link from "next/link";
import { BlogMetadata } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";

interface BlogCardProps {
    blog: BlogMetadata;
}

export function BlogCard({ blog }: BlogCardProps) {
    const [imgSrc, setImgSrc] = useState(blog.thumbnailImage);
    const fallbackImg = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80";

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col overflow-hidden glass hover:border-primary/50 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => setImgSrc(fallbackImg)}
                    />
                </div>

                <CardHeader className="space-y-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {blog.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {blog.title}
                    </h3>
                </CardHeader>

                <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                        {blog.excerpt}
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{format(new Date(blog.publishDate), "MMM dd, yyyy")}</span>
                        </div>
                    </div>

                    <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground group/btn" asChild>
                        <Link href={`/blogs/${blog.slug}`}>
                            Read My Full Blog <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
