import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={roboto.className}>

		<SessionProvider session={pageProps.session}>
			<Component className={roboto.className} {...pageProps} />
		</SessionProvider>
		</main>
	);
}
