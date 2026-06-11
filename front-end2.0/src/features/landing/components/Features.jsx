import { SectionHeading } from '../../../components/SectionHeading'
import { ValueGrid } from '../../../components/ValueGrid'
import { siteContent } from '../../../data/siteContent'

export function Features() {
  return (
    <>
      <section className="content-section" id="instituto">
        <SectionHeading
          eyebrow={siteContent.intro.eyebrow}
          title={siteContent.intro.title}
        />
        <p className="content-copy">{siteContent.intro.description}</p>
      </section>

      <section className="content-section" id="valores">
        <SectionHeading
          eyebrow={siteContent.values.eyebrow}
          title={siteContent.values.title}
        />
        <ValueGrid items={siteContent.values.items} />
      </section>
    </>
  )
}