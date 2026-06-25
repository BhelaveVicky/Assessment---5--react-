export default function Spinner({ label = 'Loading...' }) {
  return (
    <div className="loading-wrap">
      <div className="loading-card">
        <div className="spinner" />
        <h2>{label}</h2>
        <p>Fetching live crypto data from CoinGecko.</p>
        <div className="skeleton-list">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-block" />
        </div>
      </div>
    </div>
  )
}
