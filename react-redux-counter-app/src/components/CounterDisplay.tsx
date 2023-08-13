
import { useAppSelector } from "../hooks/useApp";

const CounterDisplay = () => {
  console.log("CounterDisplay rendered");

  const counter = useAppSelector((state) => state.counter);

  return <h5>{counter.count}</h5>;
}

export default CounterDisplay;
