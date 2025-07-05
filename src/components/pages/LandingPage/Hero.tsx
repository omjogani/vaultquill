import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { landingPageData } from "./landing-page-data";
import { Button } from "@/components/ui/button";
import { Body, H1, H2 } from "@/components/atoms/Typography";
import { Icon } from "@/components/atoms/Icon";

export const Hero = () => {
  const {
    tagline,
    title1,
    title2,
    description,
    subDescription,
    buttonLink,
    buttonText,
  } = landingPageData.hero;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-20 sm:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {tagline}
            </div>

            <H1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {title2}
              </span>
            </H1>

            <H2 className="mb-8 text-xl sm:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto">
              {description}
            </H2>
          </div>

          <Body className="mb-10 text-lg leading-relaxed max-w-3xl mx-auto text-muted-foreground">
            {subDescription}
          </Body>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={buttonLink}>
              <Button
                size="lg"
                className="gap-2 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Icon icon={BookOpen} size="sm" />
                {buttonText}
                <Icon
                  icon={ArrowRight}
                  size="sm"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 hover:bg-muted/50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
