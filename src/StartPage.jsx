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

  useEffect(() => {
    document.title = "CurrencyPro";
  }, []);

  return (
    <section className="start-page">
      <div>
        <h2>The safe and easy way to exchange your money</h2>
        <p>
          You always get the best exchange rate with Currencypro, whether you send, spend, or convert money in dozens of currencies. But
          don’t take our word for it.
        </p>
        <h3>Select your base currency</h3>
        <ol className="currency-list base-currency">
          {baseCurrencyOptions.map((code, i) => (
            <li key={i}>
              <button onClick={() => handleBaseCurrencyButton(code)} className={baseCurrency[0] === code[0] ? "selected-currency" : null}>
                <span>
                  <i className={`em ${getFlags(code[0])}`} role="presentation" aria-label="flag"></i>
                  <span>{code[0]}</span>
                </span>
                <span>{code[1]}</span>
              </button>
            </li>
          ))}
        </ol>
        <h3 className={baseCurrency.length === 0 ? "disabled" : null}>Select your target currency</h3>
        <ol className="currency-list target-currency">
          {targetCurrencyOptions.map((code, i) => (
            <li key={i}>
              <button
                onClick={() => handleTargetCurrencyButton(code)}
                className={targetCurrency[0] === code[0] ? "selected-currency" : null}
                disabled={baseCurrency.length === 0 || baseCurrency[0] === code[0]}>
                <span>
                  <i className={`em ${getFlags(code[0])}`} role="presentation" aria-label="flag"></i>
                  <span>{code[0]}</span>
                </span>
                <span>{code[1]}</span>
              </button>
            </li>
          ))}
        </ol>
        <button onClick={handleConvertButton} disabled={!baseCurrency[0] || !targetCurrency[0] || baseCurrency === targetCurrency}>
          Convert
        </button>
        {baseCurrency === targetCurrency && <p className="error">Base currency and target currency cannot be the same</p>}
      </div>
    </section>
  );
}
