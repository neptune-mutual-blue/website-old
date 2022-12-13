import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { getFQDN } from '../../../src/helpers'
import { services } from '../../../services'
import { PressRoom } from '../../../src/views/PressRoom'

export async function getStaticPaths ({ locales }) {
  const pages = await services.getFilteredPostPages()

  const paths = []

  locales.forEach(locale => {
    pages.forEach(page => {
      paths.push({
        locale,
        params: {
          num: page
        }
      })
    })
  })

  return {
    paths,
    fallback: false // can also be true or 'blocking'
  }
}

export async function getStaticProps ({ locale, params }) {
  const s = await serverSideTranslations(locale, ['common', 'press-room'])
  return {
    props: {
      ...(s),
      news: await services.getNews(),
      posts: await services.getPressroomPosts(),
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored',
      ...params
      // Will be passed to the page component as props
    }
  }
}

export default function PressPage (props) {
  const { t } = useTranslation('press-room')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('META_OG_TITLE')} />
        <meta property='og:description' content={t('META_OG_DESCRIPTION')} />
        <meta property='og:image' content={getFQDN(t('META_OG_IMAGE'))} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('META_TWITTER_DESCRIPTION')} />
        <meta property='twitter:title' content={t('META_TWITTER_TITLE')} />
        <meta property='twitter:image' content={getFQDN(t('META_TWITTER_IMAGE'))} />
        <meta property='twitter:image:alt' content={t('META_TWITTER_IMAGE_ALT')} />
      </Head>

      <main>
        <PressRoom news={props.news} posts={props.posts} num={props.num} />
      </main>
    </>
  )
}
