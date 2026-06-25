import { Link } from 'react-router-dom'

export default function CoinListItem({ coin }) {
  const change24h = Number(coin.price_change_percentage_24h ?? 0)

  return (
    <Link to={`/coin/${coin.id}`} className="coin-link">
      <div className="coin-card">
        <div className="coin-left">
          <img src={coin.image} alt={coin.name} className="coin-icon" />
          <div>
            <div className="coin-name-row">
              <h3>{coin.name}</h3>
              <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
            </div>
            <p className="coin-rank">Rank #{coin.market_cap_rank ?? '—'}</p>
          </div>
        </div>

        <div className="coin-right">
          <strong>${coin.current_price.toLocaleString()}</strong>
          <span className={`coin-change ${change24h >= 0 ? 'positive' : 'negative'}`}>
            {change24h >= 0 ? '+' : ''}
            {change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </Link>
  )
}
