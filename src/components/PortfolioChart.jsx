import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = Math.round((360 / numColors) * i);
      colors.push(`hsla(${hue}, 70%, 50%, 0.7)`);
    }
    return colors;
  };

  const labels = assets.map((asset) => asset.name || asset.id);

  const backgroundColors = generateColors(assets.length);

  const data = {
    labels,
    datasets: [
      {
        label: "$",
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}
