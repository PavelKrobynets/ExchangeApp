import { useState, useRef } from "react";
import "./App.css";
import ExchangeService from "../../services/exchangeService";

export default function App() {
  const [counter, setCounter] = useState(0);
	const inputRef = useRef(0);
  const excgangeService = ExchangeService();

	const handleReset = () => {
		setCounter(0);
		inputRef.current.value = "";
	}

  const getPrice = async (cc) => {
    try {
      const res = await excgangeService.getCurrency(cc);
      return res[0].rate;
    } catch (error) {
      console.log(error);
    }
  };

  const Counter = async (cc) => {
    const price = await getPrice(cc);
    if (price && counter > 0) {
      setCounter((counter) => (counter * price).toFixed(2));
    }
  };


  return (
    <div className="app">
      <input
        placeholder="Set value"
        type="number"
        className="input"
				ref={inputRef}
        onChange={(e) => {
          setCounter(e.target.value);
        }}
      ></input>
      <div className="counter">{counter}</div>
      <div className="controls">
        <button onClick={() => Counter("USD")}>USD</button>
        <button onClick={() => Counter("EUR")}>EUR</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
