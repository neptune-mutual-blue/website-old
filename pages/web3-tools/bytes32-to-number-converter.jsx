import Head from 'next/head'
import { ToolsDetail } from '../../src/views/ToolsDetail/index.jsx'

export default function Web3Pages () {
  return (
    <>
      <Head>
        <title>Bytes32 to Number converter</title>
        <link rel='icon' href='/favicon.ico' />

      </Head>

      <main>
        <ToolsDetail slug='bytes32-to-number' />
      </main>
    </>
  )
}
