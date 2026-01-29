"use client";

import { useState, useMemo } from "react";
import { BlogMetadata, Difficulty } from "@/lib/types";
import { BlogCard } from "./BlogCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface BlogListProps {
    blogs: BlogMetadata[];
}

export function BlogList({ blogs }: BlogListProps) {
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogs.forEach((blog) => blog.tags.forEach((tag) => tags.add(tag)));
        return Array.from(tags).sort();
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesSearch =
                blog.title.toLowerCase().includes(search.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                blog.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => blog.tags.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [blogs, search, selectedTags]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between glass p-6 rounded-2xl">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search my blogs, tags, content..."
                        className="pl-10 bg-white/5 border-white/10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <Select onValueChange={(val) => {
                        if (val && val !== "all" && !selectedTags.includes(val)) {
                            setSelectedTags(prev => [...prev, val]);
                        }
                    }}>
                        <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10">
                            <SelectValue placeholder="Filter by Tag" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Tags</SelectItem>
                            {allTags.map(tag => (
                                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Tags Badges */}
            <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                    <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/20 transition-colors py-1 px-3"
                        onClick={() => toggleTag(tag)}
                    >
                        {tag}
                        {selectedTags.includes(tag) && <X className="ml-1 w-3 h-3" />}
                    </Badge>
                ))}
                {selectedTags.length > 0 && (
                    <button
                        onClick={() => setSelectedTags([])}
                        className="text-xs text-muted-foreground hover:text-primary underline ml-2"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Results */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 glass rounded-3xl">
                    <h3 className="text-2xl font-bold opacity-50">No blogs found matching your criteria.</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </div>
    );
}
