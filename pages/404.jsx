import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';

export default function Custom404() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated === false) {
    return null;
  }

  const jokes = [
    "But don't worry, you can always try turning it off and on again.",
    'Oops! Looks like we lost this page. But if you keep looking, you might find Waldo instead!',
    "Sorry, this page doesn't exist. But have you tried asking the Magic 8-Ball for help?",
    "But don't worry, we've dispatched a search party to find it.",
    "Looks like you took a wrong turn somewhere. But hey, at least you're not lost in the Upside Down!",
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  return (
    <Layout>
      <div>
        <h1>404 Error: Page not found</h1>
        <p>{randomJoke}</p>
      </div>
    </Layout>
  );
}
