import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { services } from '../../services'
import { Blog } from '../../src/views/Blog'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'home'])

  return {
    props: {
      ...(s),
      blogPosts: await services.getBlogPosts(),
      videos: await services.getVideos()
      // Will be passed to the page component as props
    }
  }
}

export default function BlogPage (props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Blog blogPosts={props.blogPosts} />
      </main>
    </>
  )
}
