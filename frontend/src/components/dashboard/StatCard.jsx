function StatCard({icon, title, value, description, color = "blue"}) {

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className=" bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>

      <h2 className="text-4xl font-bold text-slate-800 mt-5">
        {value}
      </h2>

      <p className="text-lg font-semibold mt-2">
        {title}
      </p>

      <p className="text-sm text-slate-500 mt-1">
        {description}
      </p>

    </div>
  );
}

export default StatCard;