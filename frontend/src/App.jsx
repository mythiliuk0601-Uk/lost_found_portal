import { useState } from 'react';
import { Bell, ChevronDown, ClipboardList, Home as HomeIcon, LogOut, PackageCheck, PackageSearch, Plus, Search } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import Items from './pages/Items';
import ItemDetails from './pages/ItemDetails';
import MyReports from './pages/MyReports';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  const [reportType, setReportType] = useState('LOST');

  function login(newToken) {
    const payload = JSON.parse(atob(newToken.split('.')[1]));
    const nextUser = { name: payload.name, email: payload.sub, role: payload.role };
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setToken(newToken);
    setUser(nextUser);
    setPage('home');
  }

  function logout() {
    localStorage.clear();
    setToken(null);
    setUser(null);
  }

  function navigate(next, type) {
    setPage(next);
    if (type) setReportType(type);
  }

  if (!token) {
    return page === 'register' ? <Register goLogin={() => setPage('login')} onRegistered={() => setPage('login')} /> : <Login goRegister={() => setPage('register')} onLogin={login} />;
  }

  const sidebarItems = [
    { key: 'home', label: 'Dashboard', icon: HomeIcon },
    { key: 'items', label: 'Lost Items', icon: PackageSearch },
    { key: 'items', label: 'Found Items', icon: PackageCheck },
    { key: 'report', label: 'Report Lost Item', icon: Plus },
    { key: 'mine', label: 'My Reports', icon: ClipboardList }
  ];

  const content = page === 'home'
    ? <Home navigate={navigate} />
    : page === 'report'
      ? <ReportItem type={reportType} token={token} onDone={() => setPage('items')} />
      : page === 'items'
        ? <Items open={(item) => { setSelected(item); setPage('details'); }} />
        : page === 'details'
          ? <ItemDetails item={selected} token={token} back={() => setPage('items')} />
          : <MyReports token={token} open={(item) => { setSelected(item); setPage('details'); }} />;

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark" aria-label="Campus Lost and Found logo">
            <span className="brand-pin" />
            <span className="brand-lens" />
            <span className="brand-handle" />
            <span className="brand-backpack">
              <span className="backpack-top" />
              <span className="backpack-pocket" />
              <span className="backpack-side" />
            </span>
            <span className="brand-ground" />
          </span>
          <div>
            <strong>Campus</strong>
            <small>Lost &amp; Found</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map(({ key, label, icon: Icon }) => {
            const isActive =
              (key === 'home' && page === 'home') ||
              (key === 'items' && (page === 'items' || page === 'details')) ||
              (key === 'report' && page === 'report') ||
              (key === 'mine' && page === 'mine');

            return (
              <button
                key={label}
                className={isActive ? 'sidebar-link active' : 'sidebar-link'}
                onClick={() => {
                  if (key === 'home') navigate('home');
                  else if (key === 'items') navigate('items');
                  else if (key === 'report') navigate('report', 'LOST');
                  else if (key === 'mine') navigate('mine');
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-search">
            <Search size={16} />
            <input type="text" placeholder="Search items, description..." />
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon" aria-label="Notifications">
              <Bell size={17} />
            </button>
            <div className="topbar-user">
              <span className="avatar">{user?.name?.slice(0, 1).toUpperCase()}</span>
              <div>
                <strong>{user?.name}</strong>
                <small>{user?.role}</small>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="dashboard-content">{content}</div>
      </main>
    </div>
  );
}
