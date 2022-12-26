import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { services } from '../../services'
import {
  getCanonical,
  getFQDN
} from '../../src/helpers'
import { CareersDetail } from '../../src/views/CareersDetail'

export async function getStaticPaths ({ locales }) {
  const slugs = await services.getVacancySlugs()

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
  const s = await serverSideTranslations(locale, ['common', 'careers-detail'])

  return {
    props: {
      ...(s),
      vacancy: await services.getSingleVacancy(params.slug),
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

const crumbs = [
  { name: 'Home', link: '/' },
  { name: 'Careers', link: '/careers' }
]

export default function VacancyPage (props) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{props.vacancy.meta.title}</title>
        <meta name='description' content={props.vacancy.meta.description} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={props.vacancy.meta.title} />
        <meta property='og:description' content={props.vacancy.meta.description} />
        <meta property='og:image' content={getFQDN(props.vacancy.meta.image.src)} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={getCanonical(router)} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={props.vacancy.meta.description} />
        <meta property='twitter:title' content={props.vacancy.meta.title} />
        <meta property='twitter:image' content={getFQDN(props.vacancy.meta.image.src)} />
        <meta property='twitter:image:alt' content={props.vacancy.meta.image.alt} />
      </Head>

      <main>
        <CareersDetail crumbs={crumbs} vacancy={props.vacancy} />
      </main>
    </>
  )
}
