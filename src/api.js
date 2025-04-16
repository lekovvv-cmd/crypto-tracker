export async function fetchCrypto() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "WO2NRbFXNOvs8Cvnpr4Hjvd++rKfjxdmzTBLOlneRto=",
    },
  };

  const response = await fetch(
    "https://openapiv1.coinstats.app/coins",
    options
  );
  if (!response.ok) {
    throw new Error("UnLuck");
  }
  const data = await response.json();

  return { result: data.result };
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1500);
  });
}
