export const CardBase = ({
  children,
  onClick,
  dashed = false,
  accent = false,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  dashed?: boolean
  accent?: boolean
  className?: string
}) => (
  <button
    onClick={onClick}
    className={[
      'group relative flex flex-col justify-between',
      'w-72 min-w-52 h-52',
      'rounded-lg p-5 text-left',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      dashed
        ? 'border border-dashed border-bordercolor bg-transparent hover:border-primary hover:bg-offbackground'
        : accent
        ? 'border border-primary/30 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 cursor-pointer'
        : 'border border-bordercolor bg-offbackground',
      className,
    ].join(' ')}
  >
    {children}
  </button>
)
