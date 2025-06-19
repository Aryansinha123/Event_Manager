export default function EventCard({ event }) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img
        src={event.image || "https://via.placeholder.com/150"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p>{event.venue}</p>
        <p className="text-gray-500">{event.date}</p>
        <p className="font-bold">₹ {event.price}</p>
      </div>
    </div>
  );
}
