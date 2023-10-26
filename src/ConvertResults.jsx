import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

export default function ConvertResults() {
  const navigate = useNavigate();

  const {
    baseCurrency,
    targetCurrency,
    exchangeRate,
    getExchangeRate,
    amount,
    handleAmountInput,
    setBaseCurrency,
    setTargetCurrency,
    rateUpdatedTime,
  } = useContext(AppContext);

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
    navigate(`/convert/${newBaseCurrency[0].toLowerCase()}-to-${newTargetCurrency[0].toLowerCase()}`);
  }

  function getRelativeTime(unixTime) {
    const currentTime = Math.round(new Date().getTime() / 1000);
    const difference = currentTime - unixTime;
    const minutes = Math.floor(difference / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "a few seconds ago";
    }
  }

  useEffect(() => {
    getExchangeRate(baseCurrency[0], targetCurrency[0]);
    console.log(rateUpdatedTime);
  }, [baseCurrency, targetCurrency]);

  const firstPart = [...String(exchangeRate * amount)].slice(0, [...String(exchangeRate)].indexOf(".") + 4);
  const remainingDigits = [...String(exchangeRate * amount)].slice([...String(exchangeRate)].indexOf(".") + 4);

  return (
    <section className="convert-results-page">
      <div>
        <h2>Currencypro Converter</h2>
        <p>Check live foreign currency exchange rates</p>
        <p className="amounts">
          <input
            type="number"
            value={amount}
            onBlur={(e) => handleAmountInput(e.target.value)}
            onChange={(e) => handleAmountInput(e.target.value)}
          />
          <span>
            <span>
              {symbols[targetCurrency[0]]}
              {firstPart}
            </span>
            <span className="remaining-digits">{remainingDigits}</span>
          </span>
        </p>
        <div className="swap-currencies">
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
        <p className="updated-time">Last updated {getRelativeTime(rateUpdatedTime)}</p>
      </div>
    </section>
  );
}
