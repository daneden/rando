import Head from "next/head"

interface Props {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title }: Props) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}

      <main>{children}</main>
      <style jsx global>{`
        html {
          font: 125%/1.5 system-ui, -apple-system, sans-serif;
        }

        @media (prefers-color-scheme: dark) {
          html {
            color: #fefefe;
            background-color: #222;
          }

          button {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
          }
        }

        @media (max-width: 600px) {
          html {
            font-size: 100%;
          }
        }

        input,
        button {
          font: inherit;
        }

        button {
          background-color: rgba(128, 128, 128, 0.15);
          padding: 0.25em 0.75em;
          border-radius: 0.25em;
          border: none;
          cursor: pointer;
          color: inherit;
          font-weight: 500;
          transition: 0.2s ease;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        button:hover:not(:disabled),
        button:focus:not(:disabled) {
          background-color: royalblue;
          color: white;
        }

        input {
          border-radius: 0.25em;
          border: 1px solid rgba(128, 128, 128, 0.3);
          padding: 0.25em 0.5em;
          background-color: transparent;
          color: inherit;
        }

        input:focus {
          border-color: royalblue;
        }
      `}</style>
      <style jsx>{`
        main {
          margin: 0 auto;
          padding: 0.5rem;
          max-width: 30rem;
        }
      `}</style>
    </>
  )
}
