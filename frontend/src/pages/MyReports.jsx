import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { api } from '../api';
import ItemCard from '../components/ItemCard';

export default function MyReports({ token, open }) { const [items, setItems] = useState([]); useEffect(() => { api.mine(token).then(setItems).catch(() => {}); }, [token]); return <main className="page"><section className="list-heading"><div><span className="eyebrow">Your activity</span><h1>My reports</h1><p>Keep track of the items you have shared with campus.</p></div></section>{items.length ? <div className="item-grid">{items.map(item => <ItemCard key={item.id} item={item} onClick={() => open(item)}/>)}</div> : <div className="empty"><ClipboardList size={32}/><h3>No reports yet</h3><p>Your lost and found reports will appear here.</p></div>}</main>; }
