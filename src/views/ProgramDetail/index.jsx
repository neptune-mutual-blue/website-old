import { DetailComponent } from '../../components/DetailComponent'
import { Hero } from './01-hero'

export const ProgramDetail = ({ programData }) => {
  return (
    <>
      <Hero title={programData.title} />

      <DetailComponent
        title={programData.title}
        intro={programData.intro}
        headers={programData.content.toc}
        html={programData.content.html}
        breadcrumbs={[
          { name: 'Home', link: '/' },
          { name: 'Grants and Bounties', link: '/grants-and-bounties' },
          { name: programData.title }
        ]}
      />
    </>
  )
}
