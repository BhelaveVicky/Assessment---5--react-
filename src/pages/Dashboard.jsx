import { useQuery } from '@tanstack/react-query'
import CoinListItem from '../components/CoinListItem'
import Spinner from '../components/Spinner'

const fetchCoins = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
  if (!res.ok) throw new Error('Failed to fetch coins')
  return res.json()
}

export default function Dashboard() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['coins', 'markets'],
    queryFn: fetchCoins,
    staleTime: 300000,
  })

  if (isPending) return <Spinner label="Loading live coins" />
  if (isError)
    return (
      <div className="state-card state-error">
        <h2>Couldn’t load the dashboard</h2>
        <p>{error.message}</p>
      </div>
    )

  return (
    <section className="page-shell">
      <div className="page-hero">
        <h1>Top Cryptocurrencies</h1>
      </div>

      <ul className="coin-grid">
        {data.map((coin) => (
          <li key={coin.id}>
            <CoinListItem coin={coin} />
          </li>
        ))}
      </ul>
    </section>
  )
}
