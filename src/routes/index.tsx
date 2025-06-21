import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, Folder, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Body, H1, H2 } from "@/components/atoms/Typography";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/atoms/Icon";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <H1 className="mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome to VaultQuill
          </H1>
          <H2 className="mb-8 text-muted-foreground font-normal">
            Your Personal Knowledge Base
          </H2>
          <Body className="mb-8 max-w-2xl mx-auto">
            Organize your thoughts, ideas, and documents in a beautiful,
            minimalistic interface. Create collections, write notes, and build
            your personal knowledge vault.
          </Body>
          <Link to="/knowledge-base">
            <Button size="lg" className="gap-2">
              <Icon icon={BookOpen} size="sm" />
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <Icon
              icon={Folder}
              size="lg"
              className="mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Collections</h3>
            <Body className="text-sm">
              Organize your documents into nested collections
            </Body>
          </Card>

          <Card className="p-6 text-center">
            <Icon
              icon={FileText}
              size="lg"
              className="mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Documents</h3>
            <Body className="text-sm">
              Create beautiful, minimalistic documents
            </Body>
          </Card>

          <Card className="p-6 text-center">
            <Icon
              icon={Search}
              size="lg"
              className="mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Search</h3>
            <Body className="text-sm">
              Quickly find any document or collection
            </Body>
          </Card>

          <Card className="p-6 text-center">
            <Icon
              icon={BookOpen}
              size="lg"
              className="mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Knowledge</h3>
            <Body className="text-sm">Build your personal knowledge vault</Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
