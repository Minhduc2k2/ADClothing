import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "./../../hooks/axios";
import formatter from "./../../hooks/formatter";

// const data = [
//   { name: "January", Total: 1200 },
//   { name: "February", Total: 2100 },
//   { name: "March", Total: 800 },
//   { name: "April", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "June", Total: 1700 },
// ];

const Chart = ({ aspect, title }) => {
  const [checkouts, setCheckouts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/checkouts");
      let myArr = data.map((item) => {
        return {
          name: formatter.format(new Date(item.createdAt.substring(0, 10))),
          Total: item.totalCost,
        };
      });
      console.log(myArr);

      setCheckouts(myArr);
    };
    fetchData();
  }, []);
  return (
    <div className="chart">
      <div className="title">{title}</div>

      {checkouts && (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={checkouts}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#747171" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#747171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#000000"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
