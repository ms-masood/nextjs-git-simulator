import Head from 'next/head';
import {useState} from 'react';
import simpleGit from 'simple-git';
import styles from '../styles/Home.module.css';

export default function Home() {

  const [url, setUrl] = useState("");

  const handleURLInput = (e) => {
    setUrl(e.target.value);
  }

  const handleCloningAction = async () => {
    try {
      await simpleGit().clone(url, './clonned-code');
      // Make your changes here, e.g., modify a file
      // fs.writeFileSync('./clonned-code/app/page.js', 'Modified content');
      await simpleGit('./clonned-code').add('./*');
      await simpleGit('./clonned-code').commit('Updating ');
      await simpleGit('./clonned-code').push();
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Git Simulator in NextJs!
        </h1>

        <p className={styles.description}>
          <code>Let's clone your repo:</code>
        </p>

        <div className={styles.grid}>
          <input 
            className={styles.urlField}
            type="text"
            name="git-url"
            value={url}
            placeholder="Paste your git repo link here"
            onChange={handleURLInput}
          />
          <button 
            className={styles.cloneBtn}
            onClick={handleCloningAction}
          >
            Clone
          </button>
        </div>
      </main>

      <footer>
        <h3>
          Adaptavist
        </h3>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
