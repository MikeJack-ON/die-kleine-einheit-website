export function Button({ href, variant = "primary", size, type = "button", className = "", children, ...rest }) {
  const classes = [
    "btn",
    variant === "ghost" ? "btn--ghost" : "",
    size === "sm" ? "btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
