import { createFileRoute } from '@tanstack/react-router'
import { KnowledgeBasePage } from '@/components/pages/KnowledgeBasePage'

export const Route = createFileRoute('/knowledge-base')({
  component: KnowledgeBaseComponent,
})

function KnowledgeBaseComponent() {
  return (
    <KnowledgeBasePage 
      user={{
        name: 'VaultQuill User',
        email: 'user@vaultquill.com',
        avatar: undefined,
      }}
    />
  )
} 