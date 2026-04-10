import "./Toast.css";

export default function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-₹{t.type}`}>
          <span className="toast-icon">
            {t.type === "success" ? "✓" : t.type === "info" ? "ℹ" : "⚠"}
          </span>
          <span className="toast-msg">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
