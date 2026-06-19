export function Chip({ icon: Icon, children, ...rest }) {
  return (
    <span className="chip" {...rest}>
      {Icon ? <Icon /> : null}
      <span>{children}</span>
    </span>
  );
}
