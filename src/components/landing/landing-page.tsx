import { Header } from "./header";
import { Hero } from "./hero";
import { About } from "./about";
import { Services } from "./services";
import { Testimonials } from "./testimonials";
import { FAQ } from "./faq";
import { Contact } from "./contact";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
} 