// src/components/GlassCard.js
export default function GlassCard({ title, children, footer }) {
  return (
    <div className="glass-card">
      {title && <div className="card-title">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
