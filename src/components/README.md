# VaultQuill Components

This directory follows the **Atomic Design System** methodology to create a scalable and maintainable component architecture.

## Structure

### Atoms (`/atoms`)

The smallest, most basic UI elements that can't be broken down further:

- **Icon**: Reusable icon component using Lucide React icons
- **Typography**: Text components (H1, H2, H3, H4, Body, Caption, Label)
- **Avatar**: User avatar component with fallback support

### Molecules (`/molecules`)

Components that combine atoms to form more complex UI elements:

- **CollectionItem**: Represents a folder/collection in the sidebar
- **DocumentItem**: Represents a document in the sidebar or lists
- **SearchBar**: Search functionality with clear button

### Organisms (`/organisms`)

Complex components that combine molecules and atoms:

- **Sidebar**: The left navigation panel with collections and documents
- **DocumentEditor**: The main editor area with title and content editing

### Templates (`/templates`)

Page-level components that define the overall layout:

- **KnowledgeBaseLayout**: Main layout combining sidebar and editor

### Pages (`/pages`)

Complete page components that use templates:

- **KnowledgeBasePage**: The main knowledge base application page

## Features

- **Responsive Design**: All components are built with mobile-first responsive design
- **Accessibility**: Components follow accessibility best practices
- **Type Safety**: Full TypeScript support with proper interfaces
- **Theming**: Uses Shadcn UI and Tailwind CSS for consistent theming
- **Auto-save**: Documents automatically save as you type
- **Search**: Real-time search through documents and collections
- **Nested Collections**: Support for hierarchical organization

## Usage

Components are organized in a hierarchy where higher-level components can import and use lower-level ones, but not vice versa:

```
Pages → Templates → Organisms → Molecules → Atoms
```

This ensures:

- **Reusability**: Lower-level components can be reused in multiple contexts
- **Maintainability**: Changes to atoms automatically propagate upward
- **Testability**: Each level can be tested independently
- **Scalability**: New features can be built by combining existing components
