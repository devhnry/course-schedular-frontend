import type {ReactNode} from "react"
import type {LucideIcon} from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  actions?: ReactNode
  breadcrumbs?: { label: string; href?: string }[]
}

const PageHeader = ({ title, description, icon: Icon, actions, breadcrumbs }: PageHeaderProps) => {
  return (
    <div className="border-b border-gray-200 pb-6 mb-4">
      {breadcrumbs && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="text-sm text-gray-500 hover:text-gray-700">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-sm text-gray-900 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="h-6 w-6 text-gray-600" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}

export default PageHeader
