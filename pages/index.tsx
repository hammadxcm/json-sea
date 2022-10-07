import type { NextPage } from 'next';
import Head from 'next/head';
import AppHeader from '../src/foundation/components/AppHeader';
import JsonDiagram from '../src/json-diagram/components/JsonDiagram';
import JsonEditor from '../src/json-editor/JsonEditor';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>JSON Sea</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AppHeader />

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <JsonEditor />
          <JsonDiagram />
        </div>
      </main>
    </div>
  );
};

export default Home;
