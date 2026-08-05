import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import { PostDetail } from "@/pages/PostDetail";
import { SprintPage } from "@/pages/SprintPage";
import { Posts } from "@/sections/Posts";
// import { Projects } from "@/sections/Projects";
import { Learning } from "@/sections/Learning";

// ─── Homepage ─────────────────────────────────────────────────────────────────
// Order is deliberate: the primary visitor is a recruiter with ~60 seconds.
// Credibility (Experience) lands before work-in-progress (Learning, Posts).
//
// Section rhythm — two steps, applied by meaning, not uniformly:
//   major boundary (topic change)  py-24 md:py-32
//   continuation (same movement)   py-16 md:py-20
// Learning + Posts are one movement ("what I'm doing now"), so they sit close.
//
// Content widths — three named roles, nothing else:
//   prose / forms   max-w-2xl (672)
//   record          max-w-3xl (768)
//   grids           max-w-5xl (1024)
//
// Projects stays out until the product names are cleared — see PRODUCT.md.
const HomePage = () => (
  <div className="min-h-screen overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <About />
      <Experience />
      <Learning />
      <Posts />
      {/* <Projects /> */}
      <Contact />
    </main>
    <Footer />
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sprint" element={<SprintPage />} />
      <Route path="/posts/:slug" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
