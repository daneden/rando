import dynamic from "next/dynamic"
import Layout from "../components/Layout"
import Head from "next/head"

const ItemList = dynamic(() => import("../components/ItemList"), { ssr: false })

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Rando</title>
      </Head>
      <ItemList />
    </Layout>
  )
}
