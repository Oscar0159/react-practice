import "./App.css";

import { useAppDispatch } from "./hooks/useApp";
import { increment, decrement, reset } from "./redux/actions/counterActions";

import CounterDisplay from "./components/CounterDisplay";

const App = () => {
  console.log("App rendered");

  const dispatch = useAppDispatch();

  return (
    <>
      <CounterDisplay />

      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </>
  );
}

export default App;
