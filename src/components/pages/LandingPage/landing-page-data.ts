import { BookOpen, FileText, Folder, Search, Shield, Zap } from "lucide-react";

export const landingPageData = {
  hero: {
    tagline: "✨ Your Personal Knowledge Hub",
    title1: "Welcome to",
    title2: "VaultQuill",
    description:
      "Transform your ideas into organized knowledge with our beautiful, minimalistic interface",
    subDescription:
      "Create collections, write notes, and build your personal knowledge vault. Everything you need to organize your thoughts and ideas in one place.",
    buttonText: "Get Started",
    buttonLink: "/knowledge-base",
  },
  features: [
    {
      icon: Folder,
      title: "Smart Collections",
      description: "Organize documents with nested collections and tags",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      title: "Rich Documents",
      description: "Create beautiful docs with markdown and rich formatting",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Find anything instantly with powerful full-text search",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: BookOpen,
      title: "Knowledge Graph",
      description: "Visualize connections between your ideas and notes",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for seamless note-taking",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays private with end-to-end encryption",
      gradient: "from-indigo-500 to-purple-500",
    },
  ],
};
