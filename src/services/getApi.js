const getApi = async () => {
  const promise = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await promise.json();
  delete result.USDT;
  return result;
};

export default getApi;
