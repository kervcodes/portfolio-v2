import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
// import { Projects } from "@/sections/Projects";
import { Learning } from "@/sections/Learning";
import { Posts } from "@/sections/Posts";
import { Experience } from "@/sections/Experience";
// import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import { PostDetail } from "@/pages/PostDetail";

// ─── Homepage ─────────────────────────────────────────────────────────────────
const HomePage = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <About />
      {/* <Projects /> */}
      <Learning />
      <Posts />
      <Experience />
      {/* <Testimonials /> */}
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
      <Route path="/posts/:slug" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
