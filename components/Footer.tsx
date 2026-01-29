import { Satellite, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background/80 backdrop-blur-sm py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex items-center gap-2">
                        <Satellite className="w-8 h-8 text-primary" />
                        <span className="font-bold text-2xl tracking-tighter">CELESTIAL INSIGHT</span>
                    </div>
                    <p className="text-muted-foreground max-w-sm">
                        Exploring the vast expanse of the cosmos through data, research, and wonder. Your premier destination for astrophysical insights.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/blogs" className="hover:text-primary">All Blogs</Link></li>
                        <li><Link href="/about" className="hover:text-primary">About Author</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <div>
                        <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Follow My Journey</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/dipmanmajumdar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://x.com/dipmanmajumdar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/dipman-majumdar-624288341/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Celestial Insight. Built for the stars.
            </div>
        </footer>
    );
}
