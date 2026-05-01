import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Courses } from "@/components/Courses";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Highlights } from "@/components/Highlights";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { EnquiryModal } from "@/components/EnquiryModal";

const Index = () => {
  useScrollReveal();
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Courses />
      <WhyChooseUs />
      <Highlights />
      <Contact />
      <Footer />
      <EnquiryModal />
    </main>
  );
};

export default Index;
