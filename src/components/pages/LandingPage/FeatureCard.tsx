import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/atoms/Icon";
import { Body } from "@/components/atoms/Typography";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradient,
}) => {
  return (
    <Card className="group relative p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg from-primary to-blue-600" />

      <div className="relative mb-6">
        <div
          className={`inline-flex p-4 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}
        >
          <Icon icon={icon} size="lg" className="text-white" />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>

      <Body className="text-muted-foreground leading-relaxed">
        {description}
      </Body>

      <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-primary to-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
    </Card>
  );
};
