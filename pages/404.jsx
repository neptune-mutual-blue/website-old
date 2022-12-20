import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { services } from '../services'
import {
  getCanonical,
  getFQDN
} from '../src/helpers'
import { NotFound } from '../src/views/NotFound'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', '404'])

  return {
    props: {
      ...(s),
      videos: await services.getVideos(),
      pages: await services.getPages()
      // Will be passed to the page component as props
    }
  }
}

export default function NotFoundPage () {
  const { t } = useTranslation('404')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('Could Not Find the Page / Neptune Mutual')} />
        <meta property='og:description' content={t('The page you requested either not exist or has been deleted')} />
        <meta property='og:image' content={getFQDN('/assets/images/meta/og/home.png')} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('The page you requested either not exist or has been deleted')} />
        <meta property='twitter:title' content={t('Could Not Find the Page / Neptune Mutual')} />
        <meta property='twitter:image' content={getFQDN('/assets/images/meta/og/home.png')} />
        <meta property='twitter:image:alt' content={t('Could Not Find the Page Banner')} />

        <meta name='robots' content='noindex' />
      </Head>

      <main>
        <NotFound />
      </main>
    </>
  )
}
