import { Search, ClipboardList, LogOut, Plus } from 'lucide-react';

export default function Navbar({ user, navigate, logout }) {
  return <header className="navbar"><button className="brand" onClick={() => navigate('home')}><span className="brand-mark">LF</span><span>Campus<span>Connect</span></span></button><nav><button onClick={() => navigate('items')}><Search size={16}/> Browse items</button><button onClick={() => navigate('mine')}><ClipboardList size={16}/> My reports</button><button className="nav-report" onClick={() => navigate('report', 'LOST')}><Plus size={16}/> Report item</button></nav><div className="profile"><span>{user?.name?.slice(0, 1).toUpperCase()}</span><div><strong>{user?.name}</strong><small>{user?.role?.toLowerCase()}</small></div><button className="icon-button" title="Log out" onClick={logout}><LogOut size={17}/></button></div></header>;
}
