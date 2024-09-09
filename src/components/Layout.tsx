import Link from 'next/link';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/game">
          <a>Game</a>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}