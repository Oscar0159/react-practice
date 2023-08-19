import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

function App() {
  const nameASCII = useRef(0);
  const [data, setData] = useState<DataItem[]>([]);

  const handleAddData = () => {

    const newData = {
      name: `Page ${String.fromCharCode(97+nameASCII.current).toUpperCase()}`,
      uv: Math.floor(Math.random() * 10000),
      pv: Math.floor(Math.random() * 10000),
      amt: Math.floor(Math.random() * 10000),
    };
    nameASCII.current += 1;
    setData([...data, newData]);
  };

  return (
    <>
      <div className="container flex flex-col mx-auto">
        <Button className="mx-auto" variant="outline" onClick={handleAddData} >Click me</Button>
        <br />
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            className="mx-auto"
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default App;
