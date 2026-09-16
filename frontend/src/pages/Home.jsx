import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, PackageCheck, PackageSearch, ShieldCheck } from 'lucide-react';
import { api } from '../api';

export default function Home({ navigate }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.items().then(setItems).catch(() => {});
  }, []);

  const lost = items.filter((i) => i.type === 'LOST').length;
  const found = items.filter((i) => i.type === 'FOUND').length;
  const returned = items.filter((i) => i.status === 'RETURNED').length;
  const pending = items.filter((i) => i.status !== 'RETURNED').length;
  const recent = items.slice(0, 5);
  const featured = recent[0] || null;

  return (
    <div className="dashboard-home">
      <section className="welcome-panel no-illustration">
        <div className="welcome-copy">
          <p className="eyebrow">WELCOME BACK,</p>
          <h1>Mythili!</h1>
          <p>One connected place for everything misplaced on campus. Report a loss, share a find, and help bring belongings home.</p>
        </div>
      </section>

      <section className="status-grid">
        <div className="status-card lost">
          <span className="status-icon"><PackageSearch size={18} /></span>
          <div>
            <strong>{lost}</strong>
            <p>Lost items</p>
          </div>
        </div>
        <div className="status-card found">
          <span className="status-icon"><PackageCheck size={18} /></span>
          <div>
            <strong>{found}</strong>
            <p>Found items</p>
          </div>
        </div>
        <div className="status-card resolved">
          <span className="status-icon"><ShieldCheck size={18} /></span>
          <div>
            <strong>{returned}</strong>
            <p>Resolved</p>
          </div>
        </div>
        <div className="status-card pending">
          <span className="status-icon"><Clock3 size={18} /></span>
          <div>
            <strong>{pending}</strong>
            <p>Pending</p>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="report-panel">
          <div className="panel-head">
            <h3>Recent Reports</h3>
            <button className="text-button" onClick={() => navigate('items')}>
              View All <ArrowRight size={16} />
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Item</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length ? recent.map((item) => (
                <tr key={item.id || item._id || item.name}>
                  <td>
                    <span className={item.type === 'LOST' ? 'chip lost' : 'chip found'}>{item.type}</span>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.location || 'Campus'}</td>
                  <td>{new Date(item.createdAt || Date.now()).toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><span className={item.status === 'RETURNED' ? 'table-status success' : 'table-status pending'}>{item.status || 'Open'}</span></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="empty-state">No reports yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <aside className="lost-list-panel">
          <div className="panel-head left-tight">
            <h3>Lost Items</h3>
            <button className="mini-arrow" onClick={() => navigate('items')}>›</button>
          </div>

          <div className="lost-items-list">
            {recent.map((item, index) => (
              <button key={item.id || item._id || `${item.name}-${index}`} className="lost-list-item" onClick={() => navigate('items')}>
                <span className="item-icon"><PackageSearch size={16} /></span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.location || 'Campus'} • {new Date(item.createdAt || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</small>
                </div>
                <span className="chevron">›</span>
              </button>
            ))}
          </div>

          <div className="featured-detail">
            <div className="featured-header">
              <span className="chip lost">Lost</span>
              <h4>{featured?.name || 'Backpack'}</h4>
            </div>

            <div className="detail-meta">
              <strong>{featured?.location || 'Library'}</strong>
              <span>{featured ? new Date(featured.createdAt || Date.now()).toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : 'Aug 20, 2025'}</span>
            </div>

            <p>{featured?.description || 'Black color backpack with red zipper. Contains books and laptop charger.'}</p>

            <div className="contact-box">
              <span className="contact-title"><CheckCircle2 size={14} /> Contact Information</span>
              <p>If you have found this item, please contact:<br />mythili@campus.edu • +91 98765 43210</p>
            </div>

            <button className="primary full" onClick={() => navigate('report', 'FOUND')}>
              Mark as Found
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
