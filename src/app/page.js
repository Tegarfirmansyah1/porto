
import Nav from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

export const revalidate = 0;

export default function Home() {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}