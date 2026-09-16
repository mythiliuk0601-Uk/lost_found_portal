import { MapPin, CalendarDays, ArrowUpRight } from 'lucide-react';

export default function ItemCard({ item, onClick }) {
  return <button className="item-card" onClick={onClick}><div className="item-image">{item.imageUrl ? <img src={item.imageUrl} alt=""/> : <span>{item.itemName?.slice(0, 1).toUpperCase()}</span>}<b className={item.type === 'LOST' ? 'lost' : 'found'}>{item.type}</b></div><div className="item-card-body"><div className="card-title"><h3>{item.itemName}</h3><ArrowUpRight size={18}/></div><p className="category">{item.category}</p><p><MapPin size={14}/> {item.location}</p><p><CalendarDays size={14}/> {item.date}</p><em className={item.status === 'RETURNED' ? 'returned' : ''}>{item.status}</em></div></button>;
}
