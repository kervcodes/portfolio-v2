import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Renders one route to a static HTML string for the prerender script.
//
// On React 19, react-helmet-async's <Helmet> is a transparent passthrough —
// the <title>/<meta> it renders are plain elements in the tree, and React's
// own SSR hoists them to the front of the string (helmetContext.helmet stays
// empty; HelmetProvider is kept only for its client-side dedup behavior).
// The caller peels those leading tags off `html` to build the page <head>.
export function render(url) {
  const html = renderToString(
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>
  );

  return { html };
}
