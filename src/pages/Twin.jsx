import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { TWIN_URL } from "@/lib/twin";

const Shell = ({ children }) => (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex flex-col">{children}</main>
        <Footer />
    </div>
);

// The twin's own UI already renders a full page (topbar, hero, composer),
// so it is framed here rather than restyled into a portfolio section — the
// iframe is the entire "page" below the portfolio's own nav.
//
// `embedded=1` tells the twin (see EMBED_JS in the Digital-Twin repo's
// styles.py) to hide its own topbar, since this page already has one.
const embedSrc = TWIN_URL
    ? `${TWIN_URL}${TWIN_URL.includes("?") ? "&" : "?"}embedded=1`
    : "";

export const Twin = () => (
    <Shell>
        {TWIN_URL ? (
            <iframe
                src={embedSrc}
                title="Kervintz's AI digital twin"
                className="flex-1 w-full border-0"
                style={{ minHeight: "calc(100vh - 4rem)" }}
            />
        ) : (
            <div className="max-w-5xl mx-auto px-5 md:px-6 py-20">
                <div className="notice notice--warning">
                    <p className="notice__band">Unavailable</p>
                    <div className="px-5 py-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
                            The AI twin isn't connected yet.
                        </h1>
                        <p className="mt-3 text-ink-muted max-w-[62ch]">
                            Set VITE_DIGITAL_TWIN_URL once it's deployed.
                        </p>
                    </div>
                </div>
            </div>
        )}
    </Shell>
);

export default Twin;
