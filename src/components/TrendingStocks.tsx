import { ArrowUpRight, ArrowDownRight, Flame } from "lucide-react";
import { ThreatData } from "./ThreatPopup";
import SuspiciousLink from "./SuspiciousLink";
import { on } from "events";

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  volume: string;
  image: string;
  threatType?: 'danger' | 'warning' | 'safe';
  width?: number; // Optional width in pixels
  height?: number; // Optional height in pixels
}

const STOCKS: Stock[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$148.25", change: "+4.2%", up: true, volume: "52.3M", threatType: 'danger', image: "https://www.nvidia.com/favicon.ico", width: 24, height: 24 },
  { symbol: "INTC", name: "Intel Corp", price: "$50.00", change: "+1.5%", up: true, volume: "20.0M", threatType: 'warning', image: "https://www.intel.com/favicon.ico", width: 32, height: 16 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "$2,850.00", change: "+1.2%", up: true, volume: "1.5M", threatType: 'safe', image: "https://www.google.com/favicon.ico", width: 24, height: 24 },
  { symbol: "TSLA", name: "Tesla Inc", price: "$274.22", change: "-0.8%", up: false, volume: "98.2M", threatType: 'safe', image: "https://www.tesla.com/favicon.ico", width: 24, height: 24 },
  { symbol: "AAPL", name: "Apple Inc", price: "$192.10", change: "+0.4%", up: true, volume: "45.1M", image: "https://www.apple.com/favicon.ico", width: 20, height: 24 },
  { symbol: "MSFT", name: "Microsoft", price: "$425.22", change: "+0.9%", up: true, volume: "22.8M", threatType: 'danger', image: "https://www.microsoft.com/favicon.ico", width: 24, height: 24 },
  { symbol: "AMZN", name: "Amazon", price: "$180.12", change: "-0.3%", up: false, volume: "38.4M", image: "https://www.amazon.com/favicon.ico", width: 28, height: 20 },
];

interface TrendingStocksProps {
  getThreatData: (type: 'danger' | 'warning' | 'safe') => ThreatData;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  setPopupData: (data: ThreatData) => void;
}

const TrendingStocks = ({
  getThreatData,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  setPopupData,
}: TrendingStocksProps) => {
  const handleStockClick = (stock: Stock) => {
    if (stock.threatType) {
      setPopupData(getThreatData(stock.threatType));
      onMouseEnter();
    }
  };

  return (
    <div className=" p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-destructive" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Trending Stocks
        </h3>
      </div>

      <div className="space-y-3">
        {STOCKS.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between">   
          <div className="flex justify-center items-center">
                <img src={stock.image} alt={stock.name} className="mx-4" width={stock.width} height={stock.height} />
          <SuspiciousLink
            key={stock.symbol}
            text={stock.symbol}
            onMouseEnter={onMouseEnter}
            threatData={stock.threatType ? getThreatData(stock.threatType) : getThreatData('safe')}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            setPopupData={setPopupData}
          >
          </SuspiciousLink>

          </div> 
            <div className="text-right">
              <p className="text-sm font-mono-numbers text-foreground">{stock.price}</p>
              <p
                className={`text-xs font-mono-numbers flex items-center justify-end ${
                  stock.up ? "text-stock-up" : "text-stock-down"
                }`}
              >
                {stock.up ? (
                  <ArrowUpRight className="w-3 h-3 inline-block mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 inline-block mr-0.5" />
                )}
                {stock.change}
              </p>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;
