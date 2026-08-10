import { Component } from "react";

// Last line of defense for a render crash anywhere in the tree — without
// this, an uncaught error unmounts the whole app and leaves a blank white
// screen. Deliberately self-contained (no Navbar/Footer/router dependency)
// since the crash may have originated in one of those.
export class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Unhandled render error:", error, info);
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div className="min-h-screen flex items-center justify-center bg-ground px-5 py-20">
                <div className="max-w-md w-full notice notice--warning">
                    <p className="notice__band">Something went wrong</p>
                    <div className="px-5 py-6">
                        <h1 className="text-2xl font-bold text-ink tracking-tight">
                            This page hit a snag.
                        </h1>
                        <p className="mt-3 text-ink-muted leading-relaxed">
                            Try reloading — if it keeps happening, the issue is on my end,
                            not yours.
                        </p>
                        <a
                            href="/"
                            className="placard inline-flex items-center gap-2 mt-6 text-ink hover:text-ink-muted transition-colors"
                        >
                            Back to home
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorBoundary;
