import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/pages/LandingPage/Hero";
import { FeatureGrid } from "@/components/pages/LandingPage/FeatureGrid";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Hero />
      <FeatureGrid />
    </div>
  );
}
