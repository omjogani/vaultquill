import { Plus, Settings } from "lucide-react";
import { Icon } from "@/components/atoms/Icon";
import { H4 } from "@/components/atoms/Typography";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "@/components/molecules/SearchBar";
import { CollectionItem } from "@/components/molecules/CollectionItem";
import { DocumentItem } from "@/components/molecules/DocumentItem";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Collection {
  id: string;
  name: string;
  isExpanded?: boolean;
  children?: Collection[];
  documents?: Document[];
}

interface Document {
  id: string;
  title: string;
  lastModified: Date;
  collectionId?: string;
}

interface SidebarProps {
  collections?: Collection[];
  documents?: Document[];
  selectedDocumentId?: string;
  selectedCollectionId?: string;
  onDocumentSelect?: (documentId: string) => void;
  onCollectionSelect?: (collectionId: string) => void;
  onCreateDocument?: (collectionId?: string) => void;
  onCreateCollection?: () => void;
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Sidebar = ({
  collections = [],
  documents = [],
  selectedDocumentId,
  selectedCollectionId,
  onDocumentSelect,
  onCollectionSelect,
  onCreateDocument,
  onCreateCollection,
  className,
  user,
}: SidebarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(
    new Set(),
  );

  const handleCollectionToggle = (collectionId: string) => {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(collectionId)) {
      newExpanded.delete(collectionId);
    } else {
      newExpanded.add(collectionId);
    }
    setExpandedCollections(newExpanded);
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const renderCollection = (collection: Collection, level = 0) => {
    const isExpanded = expandedCollections.has(collection.id);
    const hasChildren =
      (collection.children && collection.children.length > 0) ||
      (collection.documents && collection.documents.length > 0);

    return (
      <div key={collection.id}>
        <CollectionItem
          id={collection.id}
          name={collection.name}
          isExpanded={isExpanded}
          isSelected={selectedCollectionId === collection.id}
          hasChildren={hasChildren}
          level={level}
          onClick={onCollectionSelect}
          onToggle={handleCollectionToggle}
          onRename={(id) => console.log("Rename collection:", id)}
          onDelete={(id) => console.log("Delete collection:", id)}
          onCreateDocument={onCreateDocument}
        />

        {isExpanded && (
          <>
            {collection.documents?.map((doc) => (
              <DocumentItem
                key={doc.id}
                id={doc.id}
                title={doc.title}
                lastModified={doc.lastModified}
                isSelected={selectedDocumentId === doc.id}
                level={level + 1}
                onClick={onDocumentSelect}
                onRename={(id) => console.log("Rename document:", id)}
                onDelete={(id) => console.log("Delete document:", id)}
                onDuplicate={(id) => console.log("Duplicate document:", id)}
              />
            ))}

            {collection.children?.map((child) =>
              renderCollection(child, level + 1),
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-muted/30 border-r border-border",
        className,
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <H4>VaultQuill</H4>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateDocument}
            className="h-8 w-8 p-0"
          >
            <Icon icon={Plus} size="sm" />
          </Button>
        </div>

        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search..."
          className="mb-2"
        />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {/* Quick Actions */}
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={onCreateCollection}
              className="w-full justify-start gap-2 text-sm"
            >
              <Icon icon={Plus} size="sm" />
              New Collection
            </Button>
          </div>

          <Separator className="my-2" />

          {/* Collections */}
          <div className="space-y-1">
            {(searchValue ? filteredCollections : collections).map(
              (collection) => renderCollection(collection),
            )}
          </div>

          {/* Orphan Documents */}
          {filteredDocuments.filter((doc) => !doc.collectionId).length > 0 && (
            <>
              <Separator className="my-2" />
              <div className="space-y-1">
                {filteredDocuments
                  .filter((doc) => !doc.collectionId)
                  .map((doc) => (
                    <DocumentItem
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      lastModified={doc.lastModified}
                      isSelected={selectedDocumentId === doc.id}
                      onClick={onDocumentSelect}
                      onRename={(id) => console.log("Rename document:", id)}
                      onDelete={(id) => console.log("Delete document:", id)}
                      onDuplicate={(id) =>
                        console.log("Duplicate document:", id)
                      }
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar
              src={user.avatar}
              alt={user.name}
              fallback={user.name}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {user.email}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Icon icon={Settings} size="sm" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
