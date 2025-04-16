import { createContext, useContext, useEffect, useState } from "react";
import { fetchCrypto } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
  addAsset: () => {},
  removeAsset: () => {},
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      if (!coin) {
        return asset;
      }
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    setLoading(true);
    async function preload() {
      try {
        const { result } = await fetchCrypto();
        const savedAssets = JSON.parse(localStorage.getItem("assets")) || [];
        setCrypto(result);
        setAssets(mapAssets(savedAssets, result));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    preload();
  }, []);

  function addAsset(newAsset) {
    const updatedAssets = [...assets.map((a) => ({ ...a })), newAsset];
    localStorage.setItem("assets", JSON.stringify(updatedAssets));
    setAssets(mapAssets(updatedAssets, crypto));
  }

  function removeAsset(id) {
    const updatedAssets = assets.filter((a) => a.id !== id);
    localStorage.setItem("assets", JSON.stringify(updatedAssets));
    setAssets(mapAssets(updatedAssets, crypto));
  }

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets, addAsset, removeAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
