import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { services } from '../../services'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { getFQDN } from '../../src/helpers'
import { Web3Tools } from '../../src/views/Web3Tools'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'about'])
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

export default function Web3ToolsPage () {
  const { t } = useTranslation('web3-tools')
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{t('Web3 Tools / Neptune Mutual')}</title>
        <meta name='description' content={t('Know us inside and out. Check out our quick 5 minute video explainer, get to know our people, and view our roadmap here.')} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('Web3 Tools / Neptune Mutual')} />
        <meta property='og:description' content={t('Know us inside and out. Check out our quick 5 minute video explainer, get to know our people, and view our roadmap here.')} />
        <meta property='og:image' content={getFQDN('/assets/images/meta/og/about.png')} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('Know us inside and out. Check out our quick 5 minute video explainer, get to know our people, and view our roadmap here.')} />
        <meta property='twitter:title' content={t('Web3 Tools / Neptune Mutual')} />
        <meta property='twitter:image' content={getFQDN('/assets/images/meta/og/about.png')} />
        <meta property='twitter:image:alt' content={t('Web3 Tools | Neptune Mutual')} />
      </Head>

      <main>
        <Web3Tools />
      </main>
    </>
  )
}