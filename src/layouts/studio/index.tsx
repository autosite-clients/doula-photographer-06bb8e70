import type { SketchContent } from '../../types';

import { Header } from '../../components/header';
import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Gallery } from '../../components/gallery';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { FloatingCta } from '../../components/floating-cta';
import { Faq } from '../../components/faq';
import { CourseCatalog } from './components/course-catalog';
import { ScheduleHint } from './components/schedule-hint';

interface Props {
  content: SketchContent;
}

/**
 * Studio / Courses layout — for studios that teach (yoga, art, music, dance,
 * cooking workshops, language classes, photography courses, etc.).
 *
 * Customer mental model: "what classes are available + when can I attend?"
 *
 * Order:
 *   1. Hero — atmospheric studio shot (NOT a person teaching, the SPACE)
 *   2. CourseCatalog — services rendered as course cards with target audience
 *      ("מתחילים", "מתקדמים", "ילדים") + a teaser of duration
 *   3. ScheduleHint — visual placeholder for the weekly schedule (real one
 *      comes from operator-uploaded data later)
 *   4. About — the founder's philosophy + teaching approach
 *   5. Gallery — student work / class moments
 *   6. Testimonials — student stories (results-oriented like fitness)
 *   7. Contact — registration CTA
 */
export function StudioLayout({ content }: Props) {
  return (
    <>
      <Header branding={content.branding} />
      <main>
        <Hero hero={content.hero} branding={content.branding} trust={content.trust} />
        <CourseCatalog services={content.services} themeColor={content.branding.themeColor} />
        <ScheduleHint themeColor={content.branding.themeColor} />
        <About about={content.about} />
        <Gallery images={content.gallery} />
        <Testimonials items={content.testimonials ?? []} />
        <Faq items={content.faq} themeColor={content.branding.themeColor} />
        <Contact
          contact={content.contact}
          businessName={content.branding.businessName}
          themeColor={content.branding.themeColor}
        />
      </main>
      <FloatingCta
        whatsappNumber={content.contact.whatsappNumber}
        phone={content.contact.phone}
        themeColor={content.branding.themeColor}
      />
    </>
  );
}
