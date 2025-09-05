import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Suggestions from "@/components/Suggestions";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Suggestions />
      <Footer />
    </div>
  );
};

export default Index;
