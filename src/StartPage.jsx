import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

export default function StartPage() {
  const {
    baseCurrencyOptions,
    targetCurrencyOptions,
    handleBaseCurrencyButton,
    handleTargetCurrencyButton,
    baseCurrency,
    targetCurrency,
    getSupportedCodes,
    getFlags,
  } = useContext(AppContext);

  const navigate = useNavigate();

  function handleConvertButton() {
    navigate(`/convert/${baseCurrency[0].toLowerCase()}-to-${targetCurrency[0].toLowerCase()}`);
  }

  useEffect(() => {
    getSupportedCodes();
  }, []);

  return (
    <div>
      <h2>The safe and easy way to exchange your money</h2>
      <p>
        You always get the best exchange rate with Currencypro, whether you send, spend, or convert money in dozens of currencies. But don’t
        take our word for it.
      </p>
      <h3>Select your base currency</h3>
      <ol className="currency-list base-currency">
        {baseCurrencyOptions.map((code, i) => (
          <li key={i}>
            <button onClick={() => handleBaseCurrencyButton(code)} className={baseCurrency[0] === code[0] ? "selected-currency" : null}>
              <i className={`em ${getFlags(code[0])}`} role="presentation" aria-label="flag"></i> {code[0]} {code[1]}
            </button>
          </li>
        ))}
      </ol>
      <h3>Select your target currency</h3>
      <ol className="currency-list target-currency">
        {targetCurrencyOptions.map((code, i) => (
          <li key={i}>
            <button
              onClick={() => handleTargetCurrencyButton(code)}
              className={targetCurrency[0] === code[0] ? "selected-currency" : null}
              disabled={baseCurrency.length === 0 || baseCurrency[0] === code[0]}>
              <i className={`em ${getFlags(code[0])}`} role="presentation" aria-label="flag"></i> {code[0]} {code[1]}
            </button>
          </li>
        ))}
      </ol>
      <button onClick={handleConvertButton} disabled={baseCurrency.length === 0 || targetCurrency.length === 0}>
        Convert
      </button>
    </div>
  );
}
