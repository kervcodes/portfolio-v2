import {Navbar} from "@/layout/Navbar";
import {Hero} from "@/sections/Hero";
import {About} from "@/sections/About";
import {Projects} from "@/sections/Projects";
import {Learning} from "@/sections/Learning";
import {Blogs} from "@/sections/Blogs";
import {Experience} from "@/sections/Experience";
// import {Testimonials} from "@/sections/Testimonials";
import {Contact} from "@/sections/Contact";
import {Footer} from "@/layout/Footer";

function App() {

  return (
    <div className= "min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <Projects /> */}
        <Learning />
        <Blogs />
        <Experience />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
