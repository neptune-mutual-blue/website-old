import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { services } from '../../services'
import {
  getCanonical,
  getFQDN
} from '../../src/helpers'
import { Policy } from '../../src/views/Policy'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'policy'])
  const pages = await services.getPages()
  const page = await services.getSinglePage(pages[0].slug)

  return {
    props: {
      ...(s),
      videos: await services.getVideos(),
      pages,
      page,
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

export default function PolicyPage (props) {
  const { t } = useTranslation('policy')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('META_OG_TITLE')} />
        <meta property='og:description' content={t('META_OG_DESCRIPTION')} />
        <meta property='og:image' content={getFQDN(t('META_OG_IMAGE'))} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={getCanonical(router)} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('META_TWITTER_DESCRIPTION')} />
        <meta property='twitter:title' content={t('META_TWITTER_TITLE')} />
        <meta property='twitter:image' content={getFQDN(t('META_TWITTER_IMAGE'))} />
        <meta property='twitter:image:alt' content={t('META_TWITTER_IMAGE_ALT')} />
      </Head>

      <main>
        <Policy
          page={props.page}
          slugs={props.pages}
          activeSlug={props.page.slug}
        />
      </main>
    </>
  )
}
