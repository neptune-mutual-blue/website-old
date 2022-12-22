import Head from 'next/head'
import { ToolsDetail } from '../../src/views/ToolsDetail/index.jsx'

export default function Web3Pages () {
  return (
    <>
      <Head>
        <title>Number to Bytes32 converter</title>
        <link rel='icon' href='/favicon.ico' />

      </Head>

      <main>
        <ToolsDetail slug='number-to-bytes32' />
      </main>
    </>
  )
}
