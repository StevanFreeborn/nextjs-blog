import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../styles/Layout.module.css';
import utilStyles from '../styles/utils.module.css';

const name = 'Stevan Freeborn';
export const siteTitle = "Stevan Freeborn's Blog";

export default function Layout({
  children,
  home,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <meta
          name='description'
          content='A blog written by Stevan Freeborn'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta
          name='og:title'
          content={siteTitle}
        />
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src='/images/profile.jpeg'
              className={utilStyles.borderCircle}
              height={200}
              width={200}
              alt=''
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href='/'>
              <Image
                priority
                src='/images/profile.jpeg'
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=''
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link
                href='/'
                className={utilStyles.colorInherit}
              >
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href='/'>← Back to home</Link>
        </div>
      )}
    </div>
  );
}
