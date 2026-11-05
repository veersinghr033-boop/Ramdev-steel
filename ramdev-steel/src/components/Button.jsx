export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  icon,
  iconPosition = "right",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 border border-orange-400/20",
    secondary:
      "bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-sm",
    dark:
      "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/60 shadow-md",
    outline:
      "border border-orange-500/40 hover:border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white",
    ghost:
      "text-zinc-300 hover:text-white hover:bg-white/5",
    whatsapp:
      "bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-green-500/25",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {content}
    </button>
  );
}

export default Button;
