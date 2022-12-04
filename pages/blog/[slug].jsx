import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { services } from '../../services'
import { BlogPost } from '../../src/views/SingleBlog'

export async function getStaticPaths () {
  const slugs = await services.getPostsSlugs()

  const paths = slugs.map(slug => {
    return {
      params: {
        slug
      }
    }
  })

  return {
    paths,
    fallback: false // can also be true or 'blocking'
  }
}

export async function getStaticProps ({ locale, params }) {
  const s = await serverSideTranslations(locale, ['common', 'blog-post'])

  return {
    props: {
      ...(s),
      blogPosts: await services.getBlogPosts(),
      post: await services.getSinglePost(params.slug),
      videos: await services.getVideos()
      // Will be passed to the page component as props
    }
  }
}

export default function BlogPostPage (props) {
  return (
    <>
      <Head>
        <title>{props.post.meta.title}</title>
        <meta name='description' content={props.post.meta.description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <BlogPost post={props.post} blogPosts={props.blogPosts} />
      </main>
    </>
  )
}
