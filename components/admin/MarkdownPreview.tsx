"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

const components = {
    h1: (props: any) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4 border-b border-white/10 pb-2" />,
    h2: (props: any) => <h2 {...props} className="text-3xl font-bold mt-6 mb-3" />,
    h3: (props: any) => <h3 {...props} className="text-2xl font-bold mt-4 mb-2" />,
    p: (props: any) => <p {...props} className="text-muted-foreground leading-relaxed mb-4 text-lg" />,
    ul: (props: any) => <ul {...props} className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground" />,
    ol: (props: any) => <ol {...props} className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground" />,
    code: (props: any) => <code {...props} className="bg-white/10 rounded px-1 text-sm font-mono" />,
    pre: (props: any) => <pre {...props} className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto my-6 border border-white/5" />,
    blockquote: (props: any) => <blockquote {...props} className="border-l-4 border-primary pl-4 italic my-6 text-xl text-white/80" />,
    img: (props: any) => (
        <div className="my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img {...props} className="w-full h-auto" />
        </div>
    ),
};

export function MarkdownPreview({ content }: { content: string }) {
    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
