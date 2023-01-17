import { cn } from '@bem-react/classname'

import { Audit } from 'shared/models/audit'

export type AuditCardProps = {
  audit: Audit
}

export const componentId = 'AuditCard'
const bem = cn(componentId)

export const AuditCard: React.FC<AuditCardProps> = ({ audit }: { audit: Audit }) => {
  return <div className={bem()}>Audit Card</div>
}
