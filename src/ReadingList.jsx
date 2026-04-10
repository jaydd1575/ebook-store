import { useEffect } from "react";
import "./ReadingList.css";

const STATUS_LABELS = { want: "Want to Read", reading: "Currently Reading", done: "Finished" };
const STATUS_COLORS = { want: "#c9a85c", reading: "#5ca8c9", done: "#5cb87e" };

export default function ReadingList({ open, items, onClose, onRemove, onUpdateProgress, onUpdateStatus }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const grouped = {
    reading: items.filter((i) => i.status === "reading"),
    want: items.filter((i) => i.status === "want"),
    done: items.filter((i) => i.status === "done"),
  };

  return (
    <>
      <div className={`drawer-overlay ₹{open ? "open" : ""}`} onClick={onClose} />
      <aside className={`rl-drawer ₹{open ? "open" : ""}`}>
        <div className="drawer-header">
          <div>
            <h2 className="drawer-heading">Reading List</h2>
            <span className="drawer-count">{items.length} books tracked</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="rl-stats">
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <div key={key} className="rl-stat">
              <span className="rl-stat-num" style={{ color: STATUS_COLORS[key] }}>{grouped[key].length}</span>
              <span className="rl-stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="rl-items">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <span>📖</span>
              <p>No books tracked yet</p>
              <small>Click "Add to Reading List" on any book</small>
            </div>
          ) : (
            Object.entries(grouped).map(([status, group]) =>
              group.length > 0 ? (
                <div key={status} className="rl-group">
                  <div className="rl-group-label" style={{ color: STATUS_COLORS[status] }}>
                    {STATUS_LABELS[status]} ({group.length})
                  </div>
                  {group.map((item) => (
                    <div key={item.id} className="rl-item">
                      <img src={item.cover} alt={item.title} className="rl-img" />
                      <div className="rl-info">
                        <p className="rl-title">{item.title}</p>
                        <p className="rl-author">{item.author}</p>
                        <div className="rl-status-row">
                          <select
                            value={item.status}
                            onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                            className="rl-status-select"
                            style={{ color: STATUS_COLORS[item.status] }}
                          >
                            {Object.entries(STATUS_LABELS).map(([k, v]) => (
                              <option key={k} value={k}>{v}</option>
                            ))}
                          </select>
                        </div>
                        {item.status === "reading" && (
                          <div className="rl-progress-wrap">
                            <div className="rl-progress-bar">
                              <div
                                className="rl-progress-fill"
                                style={{ width: `₹{item.progress}%` }}
                              />
                            </div>
                            <input
                              type="range"
                              min="0" max="100"
                              value={item.progress}
                              onChange={(e) => onUpdateProgress(item.id, Number(e.target.value))}
                              className="rl-range"
                            />
                            <span className="rl-progress-num">{item.progress}%</span>
                          </div>
                        )}
                      </div>
                      <button className="rl-remove" onClick={() => onRemove(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
              ) : null
            )
          )}
        </div>
      </aside>
    </>
  );
}
