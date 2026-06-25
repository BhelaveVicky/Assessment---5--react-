import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../components/Spinner'

const fetchCoin = async (id) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
  if (!res.ok) throw new Error('Failed to fetch coin details')
  return res.json()
}

export default function CoinDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoin(id),
    enabled: Boolean(id),
    staleTime: 300000,
    refetchInterval: 10000,
  })

  if (isPending) return <Spinner label="Loading coin details" />
  if (isError)
    return (
      <div className="state-card state-error">
        <h2>Couldn’t load coin details</h2>
        <p>{error.message}</p>
        <button className="button button-secondary" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    )

  const price = data?.market_data?.current_price?.usd
  const change24h = data?.market_data?.price_change_percentage_24h
  const marketCap = data?.market_data?.market_cap?.usd
  const high24h = data?.market_data?.high_24h?.usd
  const low24h = data?.market_data?.low_24h?.usd
  const supply = data?.market_data?.circulating_supply
  const stats = [
    { label: 'Market cap', value: marketCap, format: 'currency' },
    { label: '24h high', value: high24h, format: 'currency' },
    { label: '24h low', value: low24h, format: 'currency' },
    { label: 'Circulating supply', value: supply, format: 'number' },
  ]
  const descriptionText =
    data?.description?.en?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() ||
    'No description available for this coin.'

  return (
    <section className="page-shell">
      <div className="details-topbar">
        <button className="button button-secondary" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
        <span className={`live-chip ${isFetching ? 'live-chip-active' : ''}`}>
          {isFetching ? 'Refreshing live data...' : 'Live price ready'}
        </span>
      </div>

      <div className="details-hero">
        <div className="details-identity">
          <img src={data.image?.large} alt={data.name} className="coin-avatar" />
          <div>
            <p className="eyebrow">Coin details</p>
            <h1>
              {data.name} <span>{data.symbol.toUpperCase()}</span>
            </h1>
            <p className="page-subtitle">Real-time tracking for {data.name}.</p>
          </div>
        </div>

        <div className="price-panel">
          <span className="panel-label">Current price</span>
          <div className="price-value">${price?.toLocaleString() ?? 'N/A'}</div>
          <div className={`change-pill ${Number(change24h) >= 0 ? 'positive' : 'negative'}`}>
            {Number(change24h) >= 0 ? '+' : ''}
            {Number(change24h).toFixed(2)}% in 24h
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <span>{stat.label}</span>
            <strong>
              {stat.value == null
                ? 'N/A'
                : stat.format === 'currency'
                  ? `$${stat.value.toLocaleString()}`
                  : stat.value.toLocaleString()}
            </strong>
          </article>
        ))}
      </div>

      <div className="description-card">
        <div className="section-head">
          <h2>About this coin</h2>
          <p>Updated from live CoinGecko data</p>
        </div>
        <p>{descriptionText}</p>
      </div>
    </section>
  )
}
