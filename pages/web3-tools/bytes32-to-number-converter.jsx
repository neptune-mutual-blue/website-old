import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { services } from '../../services'
import Head from 'next/head'
import { ToolsDetail } from '../../src/views/ToolsDetail/index.jsx'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'web3-tools'])
  return {
    props: {
      ...(s),
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

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
