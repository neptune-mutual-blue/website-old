import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { services } from '../../services'
import {
  getCanonical,
  getFQDN
} from '../../src/helpers'
import { PressroomPostDetail } from '../../src/views/PressroomPostDetail'

export async function getStaticPaths ({ locales }) {
  const slugs = await services.pressroom.getPostsSlugs()

  const paths = []

  locales.forEach(locale => {
    slugs.forEach(slug => {
      paths.push({
        locale,
        params: {
          slug
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
  const s = await serverSideTranslations(locale, ['common'])

  const post = await services.pressroom.getSinglePost(params.slug)

  return {
    props: {
      ...(s),
      post,
      relatedPosts: await services.pressroom.getRelatedPosts(post.tags, params.slug),
      videos: await services.getVideos(),
      pages: await services.getPages()
      // Will be passed to the page component as props
    }
  }
}

export default function BlogPostPage (props) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{props.post.meta.title}</title>
        <meta name='description' content={props.post.meta.description} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='article' />
        <meta property='og:title' content={props.post.meta.title} />
        <meta property='og:description' content={props.post.meta.description} />
        <meta property='og:image' content={getFQDN(props.post.meta.image.src)} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={router.asPath} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={props.post.meta.description} />
        <meta property='twitter:title' content={props.post.meta.title} />
        <meta property='twitter:image' content={getFQDN(props.post.meta.image.src)} />
        <meta property='twitter:image:alt' content={props.post.meta.image.alt} />
      </Head>

      <main>
        <PressroomPostDetail post={props.post} relatedPosts={props.relatedPosts} />
      </main>
    </>
  )
}
