export default function ExchangeService() {
  const API =
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  const getCurrency = async (cc) => {
    const res = await getResource(`${API}`);
    return _transformCurrency(res.filter((item) => item.cc === cc));
  };

  const _transformCurrency = (currencyData) => {
    return currencyData.map((item) => ({
      code: item.cc,
      rate: item.rate,
      text: item.txt,
      ...item, // include any additional properties
    }));
  };

  return { getCurrency };

	
}
