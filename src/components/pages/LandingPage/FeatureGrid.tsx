import { FeatureCard } from "./FeatureCard";
import { landingPageData } from "./landing-page-data";

export const FeatureGrid = () => {
  const { features } = landingPageData;

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              stay organized
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you capture, organize, and
            connect your ideas effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
