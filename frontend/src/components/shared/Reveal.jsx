import { useReveal } from "@/hooks/useReveal";

export function Reveal({ as: Tag = "div", className = "", style, children, ...rest }) {
  const { ref, isVisible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
