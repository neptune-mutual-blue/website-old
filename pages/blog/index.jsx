import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { services } from '../../services'
import {
  getCanonical,
  getFQDN
} from '../../src/helpers'
import { Blog } from '../../src/views/Blog'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'blog'])
  const featuredPosts = await services.getFeaturedPosts()
  const filteredPosts = await services.getBlogPaginatedData(null, 0)

  return {
    props: {
      ...(s),
      featuredPosts,
      blogPosts: filteredPosts.posts,
      totalPages: filteredPosts.totalPages,
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

export default function BlogPage (props) {
  const { t } = useTranslation('blog')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('Neptune Mutual Decentralized Insurance Blog')} />
        <meta property='og:description' content={t('Find out our most current updates, recent instances involving decentralized insurance news, hacks, rug pulls, and exploits.')} />
        <meta property='og:image' content={getFQDN('/assets/images/meta/og/blog.png')} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('Find out our most current updates, recent instances involving decentralized insurance news, hacks, rug pulls, and exploits.')} />
        <meta property='twitter:title' content={t('Neptune Mutual Decentralized Insurance Blog')} />
        <meta property='twitter:image' content={getFQDN('/assets/images/meta/og/blog.png')} />
        <meta property='twitter:image:alt' content={t('Neptune Mutual Blog Open Graph Banner')} />
      </Head>

      <main>
        <Blog
          featuredPosts={props.featuredPosts}
          blogPosts={props.blogPosts}
          totalPages={props.totalPages}
          page={0}
        />
      </main>
    </>
  )
}
