import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

export default function ConvertResults() {
  const { baseCurrency, targetCurrency, exchangeRate, getExchangeRate, amount, handleAmountInput, setBaseCurrency, setTargetCurrency } =
    useContext(AppContext);

  const symbols = {
    USD: "$",
    EUR: "€",
    CAD: "C$",
    PKR: "₨",
    INR: "₹",
    GBP: "£",
    BRL: "R$",
    IDR: "Rp",
    JPY: "¥",
    CNY: "¥",
  };

  function swapCurrencies() {
    const newBaseCurrency = targetCurrency;
    const newTargetCurrency = baseCurrency;
    setBaseCurrency(newBaseCurrency);
    setTargetCurrency(newTargetCurrency);
  }

  useEffect(() => {
    getExchangeRate(baseCurrency[0], targetCurrency[0]);
  }, [baseCurrency, targetCurrency]);

  return (
    <>
      <h2>Currencypro Converter</h2>
      <p>Check live foreign currency exchange rates</p>
      <p className="base-amount">{symbols[baseCurrency[0]]}1.00</p>
      <div>
        <span>
          {baseCurrency[0]}-{baseCurrency[1]}
        </span>
        <button onClick={() => swapCurrencies()} className="swap-button">
          <span className="material-symbols-outlined">currency_exchange</span>
        </button>
        <span>
          {targetCurrency[0]}-{targetCurrency[1]}
        </span>
      </div>
      <p>1.00 {baseCurrency[1]} =</p>
      {exchangeRate} {targetCurrency[1]}
    </>
  );
}
