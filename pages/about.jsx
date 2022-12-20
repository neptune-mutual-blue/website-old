import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { services } from '../services'
import {
  getCanonical,
  getFQDN
} from '../src/helpers'
import { AboutUs } from '../src/views/AboutUs'

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

export default function HomePage () {
  const { t } = useTranslation('about')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('About Us / Neptune Mutual')} />
        <meta property='og:description' content={t('Know us inside and out. Check out our quick 5 minute video explainer, get to know our people, and view our roadmap here.')} />
        <meta property='og:image' content={getFQDN('/assets/images/meta/og/about.png')} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('Know us inside and out. Check out our quick 5 minute video explainer, get to know our people, and view our roadmap here.')} />
        <meta property='twitter:title' content={t('About Us / Neptune Mutual')} />
        <meta property='twitter:image' content={getFQDN('/assets/images/meta/og/about.png')} />
        <meta property='twitter:image:alt' content={t('About Neptune Mutual')} />
      </Head>

      <main>
        <AboutUs />
      </main>
    </>
  )
}
