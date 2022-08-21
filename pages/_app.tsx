import 'tailwindcss/tailwind.css';

import '../styles/globals.css';
import '../styles/Calendar.css';
import '../styles/Schedule.css';

import type { AppProps } from 'next/app';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
