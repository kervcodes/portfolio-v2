import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Arrow } from "@/components/Checklist";

const Shell = ({ children }) => (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
    </div>
);

// Catch-all for any path that doesn't match a route — visiting /projects
// with no slug, a mistyped URL, a dead link from an old share. Without this,
// <Routes> matches nothing and renders an empty page under the app shell.
export const NotFound = () => (
    <Shell>
        <Helmet>
            <title>Page Not Found | Kervintz Noel</title>
            <meta name="robots" content="noindex" />
        </Helmet>
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-20">
            <div className="notice notice--warning">
                <p className="notice__band">404</p>
                <div className="px-5 py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
                        This page doesn't exist.
                    </h1>
                    <p className="mt-3 text-ink-muted max-w-[62ch]">
                        The link may be mistyped, or the page may have moved.
                    </p>
                    <p className="mt-6">
                        <Link
                            to="/"
                            className="placard inline-flex items-center gap-2 text-ink-muted hover:text-ink transition-colors"
                        >
                            <Arrow dir="left" />
                            Back to home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </Shell>
);

export default NotFound;
