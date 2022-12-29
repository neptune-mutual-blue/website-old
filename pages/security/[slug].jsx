import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { services } from '../../services'
import {
  getCanonical,
  getFQDN
} from '../../src/helpers'
import { Audit } from '../../src/views/SecurityAuditDetail'

export async function getStaticPaths ({ locales }) {
  const slugs = await services.getAuditSlugs()

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
  const s = await serverSideTranslations(locale, ['common', 'security-detail'])

  return {
    props: {
      ...(s),
      audit: await services.getSingleAudit(params.slug),
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

export default function AuditPage (props) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{props.audit.meta.title}</title>
        <meta name='description' content={props.audit.meta.description} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={props.audit.meta.title} />
        <meta property='og:description' content={props.audit.meta.description} />
        <meta property='og:image' content={getFQDN(props.audit.meta.image.src)} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={getCanonical(router)} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={props.audit.meta.description} />
        <meta property='twitter:title' content={props.audit.meta.title} />
        <meta property='twitter:image' content={getFQDN(props.audit.meta.image.src)} />
        <meta property='twitter:image:alt' content={props.audit.meta.image.alt} />
      </Head>

      <main>
        <Audit audit={props.audit} />
      </main>
    </>
  )
}
