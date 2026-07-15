import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";

function FeedbackChart() {

  const data = [
    {
      mes: "Jan",
      feedbacks: 20,
    },
    {
      mes: "Fev",
      feedbacks: 35,
    },
    {
      mes: "Mar",
      feedbacks: 42,
    },
    {
      mes: "Abr",
      feedbacks: 56,
    },
    {
      mes: "Mai",
      feedbacks: 68,
    },
  ];

  return (

    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Evolução dos Feedbacks
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="feedbacks"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default FeedbackChart;