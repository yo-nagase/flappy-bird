import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to Flappy Bird</h1>
      <Link href="/game">Play Game</Link>
    </div>
  )
}
