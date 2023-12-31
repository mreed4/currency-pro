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
  const [rateUpdatedTime, setRateUpdatedTime] = useState(0);

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
    setRateUpdatedTime(json.time_last_update_unix);
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

  function getFlags(code) {
    const flags = {
      USD: "em-us",
      EUR: "em-flag-eu",
      CAD: "em-flag-ca",
      PKR: "em-flag-pk",
      INR: "em-flag-in",
      GBP: "em-flag-gb",
      BRL: "em-flag-br",
      IDR: "em-flag-id",
      JPY: "em-flag-jp",
      CNY: "em-flag-cn",
    };

    return flags[code];
  }

  const value = {
    baseCurrencyOptions,
    targetCurrencyOptions,
    baseCurrency,
    targetCurrency,
    exchangeRate,
    amount,
    rateUpdatedTime,
    setBaseCurrency,
    setTargetCurrency,
    handleBaseCurrencyButton,
    handleTargetCurrencyButton,
    handleAmountInput,
    getSupportedCodes,
    getExchangeRate,
    getFlags,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
