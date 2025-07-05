import { useState } from "react";
import { Sidebar } from "@/components/organisms/Sidebar";
import { DocumentEditor } from "@/components/organisms/DocumentEditor";
import { cn } from "@/lib/utils";

interface Collection {
  id: string;
  name: string;
  isExpanded?: boolean;
  children?: Array<Collection>;
  documents?: Array<Document>;
}

interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
  collectionId?: string;
}

interface KnowledgeBaseLayoutProps {
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

// Mock data for demonstration
const mockCollections: Array<Collection> = [
  {
    id: "1",
    name: "Personal Projects",
    isExpanded: true,
    documents: [
      {
        id: "doc1",
        title: "Project Ideas",
        content:
          "# Project Ideas\n\nHere are some ideas for future projects...",
        lastModified: new Date("2024-01-15T10:30:00"),
        collectionId: "1",
      },
      {
        id: "doc2",
        title: "Meeting Notes",
        content:
          "# Meeting Notes\n\n## January 15, 2024\n\n- Discussed project timeline\n- Reviewed requirements",
        lastModified: new Date("2024-01-15T14:30:00"),
        collectionId: "1",
      },
    ],
    children: [
      {
        id: "2",
        name: "Web Development",
        documents: [
          {
            id: "doc3",
            title: "React Best Practices",
            content:
              "# React Best Practices\n\n## Component Structure\n\n1. Keep components small and focused\n2. Use TypeScript for better type safety",
            lastModified: new Date("2024-01-14T16:00:00"),
            collectionId: "2",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Learning",
    documents: [
      {
        id: "doc4",
        title: "JavaScript Concepts",
        content:
          "# JavaScript Concepts\n\n## Closures\n\nClosures are functions that have access to variables in their outer scope...",
        lastModified: new Date("2024-01-13T09:15:00"),
        collectionId: "3",
      },
    ],
  },
];

const mockOrphanDocuments: Array<Document> = [
  {
    id: "doc5",
    title: "Quick Notes",
    content:
      "# Quick Notes\n\nRandom thoughts and ideas that don't belong to any specific collection.",
    lastModified: new Date("2024-01-16T08:45:00"),
  },
];

// Helper function to flatten documents from collections
const flattenDocuments = (collections: Array<Collection>): Array<Document> => {
  const docs: Array<Document> = [];

  const extractDocs = (collections: Array<Collection>) => {
    collections.forEach((collection) => {
      if (collection.documents) {
        docs.push(...collection.documents);
      }
      if (collection.children) {
        extractDocs(collection.children);
      }
    });
  };

  extractDocs(collections);
  return docs;
};

export const KnowledgeBaseLayout = ({
  className,
  user,
}: KnowledgeBaseLayoutProps) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);
  const [collections, setCollections] =
    useState<Array<Collection>>(mockCollections);
  const [orphanDocuments, setOrphanDocuments] =
    useState<Array<Document>>(mockOrphanDocuments);

  // Get all documents
  const allDocuments = [...flattenDocuments(collections), ...orphanDocuments];
  const selectedDocument = allDocuments.find(
    (doc) => doc.id === selectedDocumentId,
  );

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setSelectedCollectionId(null);
  };

  const handleCollectionSelect = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
    setSelectedDocumentId(null);
  };

  const handleCreateDocument = (collectionId?: string) => {
    const newDoc: Document = {
      id: `doc${Date.now()}`,
      title: "Untitled",
      content: "",
      lastModified: new Date(),
      collectionId,
    };

    if (collectionId) {
      // Add to specific collection (would need recursive update for nested collections)
      // For simplicity, adding to orphan documents here
      setOrphanDocuments((prev) => [...prev, newDoc]);
    } else {
      setOrphanDocuments((prev) => [...prev, newDoc]);
    }

    setSelectedDocumentId(newDoc.id);
    setSelectedCollectionId(null);
  };

  const handleCreateCollection = () => {
    const newCollection: Collection = {
      id: `collection${Date.now()}`,
      name: "New Collection",
      documents: [],
    };

    setCollections((prev) => [...prev, newCollection]);
    setSelectedCollectionId(newCollection.id);
  };

  const handleDocumentSave = (updatedDocument: Partial<Document>) => {
    const updateInCollections = (
      collections: Array<Collection>,
    ): Array<Collection> => {
      return collections.map((collection) => ({
        ...collection,
        documents: collection.documents?.map((doc) =>
          doc.id === updatedDocument.id ? { ...doc, ...updatedDocument } : doc,
        ),
        children: collection.children
          ? updateInCollections(collection.children)
          : undefined,
      }));
    };

    // Update in collections
    setCollections(updateInCollections);

    // Update in orphan documents
    setOrphanDocuments((prev) =>
      prev.map((doc) =>
        doc.id === updatedDocument.id ? { ...doc, ...updatedDocument } : doc,
      ),
    );
  };

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      <Sidebar
        collections={collections}
        documents={orphanDocuments}
        selectedDocumentId={selectedDocumentId}
        selectedCollectionId={selectedCollectionId}
        onDocumentSelect={handleDocumentSelect}
        onCollectionSelect={handleCollectionSelect}
        onCreateDocument={handleCreateDocument}
        onCreateCollection={handleCreateCollection}
        user={user}
        className="w-80 shrink-0"
      />

      <DocumentEditor
        document={selectedDocument}
        onSave={handleDocumentSave}
        className="flex-1"
      />
    </div>
  );
};
