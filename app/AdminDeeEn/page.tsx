import { isAuthenticated } from "./actions";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAllBlogs } from "@/lib/blog";

export default async function AdminPage() {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        return <AdminLogin />;
    }

    const blogs = await getAllBlogs();

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
            <AdminDashboard initialBlogs={blogs} />
        </div>
    );
}
