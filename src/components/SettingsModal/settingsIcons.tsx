type IconProps = { className?: string; 'aria-hidden'?: boolean };

export function IconGlobe({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...rest}>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" />
      <path d="M3 12h18M12 3c2.5 3.5 2.5 14.5 0 18M12 3c-2.5 3.5-2.5 14.5 0 18" strokeLinecap="round" />
    </svg>
  );
}

export function IconPalette({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...rest}>
      <path
        d="M12 3a7 7 0 1 0 7 7c0 1.5-.5 2-2 2h-2v2a2 2 0 0 1-4 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconVolume({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...rest}>
      <path d="M4 10v4h3l4 3V7L7 10H4Z" strokeLinejoin="round" />
      <path d="M15 9c1.5 1.2 1.5 4.8 0 6M17.5 6.5c3 2.5 3 9.5 0 12" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...rest}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
