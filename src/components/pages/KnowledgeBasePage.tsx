import { KnowledgeBaseLayout } from '@/components/templates/KnowledgeBaseLayout'

interface KnowledgeBasePageProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export const KnowledgeBasePage = ({ user }: KnowledgeBasePageProps) => {
  return (
    <div className="h-screen overflow-hidden">
      <KnowledgeBaseLayout 
        user={user || {
          name: 'John Doe',
          email: 'john@example.com',
          avatar: undefined,
        }}
      />
    </div>
  )
} 