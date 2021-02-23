import dynamic from "next/dynamic"
import Layout from "../components/Layout"

const ItemList = dynamic(() => import("../components/ItemList"), { ssr: false })

export default function HomePage() {
  return (
    <Layout>
      <ItemList />
    </Layout>
  )
}
