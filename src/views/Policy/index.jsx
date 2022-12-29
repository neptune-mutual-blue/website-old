import { DetailComponent } from '../../components/DetailComponent'
import { Hero } from './01-hero'

export const Policy = ({ page, activeSlug, slugs }) => {
  return (
    <>
      <Hero slugs={slugs} activeSlug={activeSlug} />

      <DetailComponent
        headers={page.content.toc}
        html={page.content.html}
        title='Policies'
        sharelinks={false}
      />
    </>
  )
}
