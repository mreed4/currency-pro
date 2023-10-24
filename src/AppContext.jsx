import { createContext, useState } from "react";

const netlify = "/.netlify/functions";

const AppContext = createContext();

function AppProvider({ children }) {
  const [baseCurrencyOptions, setBaseCurrencyOptions] = useState([]);
  const [targetCurrencyOptions, setTargetCurrencyOptions] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState([]);
  const [targetCurrency, setTargetCurrency] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(0);

  async function getSupportedCodes() {
    const response = await fetch(`${netlify}/getSupportedCodes`);
    const json = await response.json();
    const filteredCodes = json.supported_codes.filter((code) =>
      ["USD", "EUR", "CAD", "PKR", "INR", "GBP", "BRL", "IDR", "JPY", "CNY"].includes(code[0])
    );
    setBaseCurrencyOptions(filteredCodes);
    setTargetCurrencyOptions(filteredCodes);
  }

  async function getExchangeRate(baseCurrency, targetCurrency) {
    const response = await fetch(`${netlify}/getPairConversionRate?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}`);
    const json = await response.json();
    setExchangeRate(json.conversion_rate);
  }

  function handleAmountInput(newAmount) {
    setAmount(newAmount);
  }

  function handleBaseCurrencyButton(newBaseCurrency) {
    setBaseCurrency(newBaseCurrency);
  }

  function handleTargetCurrencyButton(newTargetCurrency) {
    setTargetCurrency(newTargetCurrency);
  }

  const value = {
    baseCurrencyOptions,
    targetCurrencyOptions,
    baseCurrency,
    targetCurrency,
    exchangeRate,
    amount,
    setBaseCurrency,
    setTargetCurrency,
    handleBaseCurrencyButton,
    handleTargetCurrencyButton,
    handleAmountInput,
    getSupportedCodes,
    getExchangeRate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
