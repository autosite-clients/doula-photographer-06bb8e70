import type { SketchContent } from '../../types';

import { Header } from '../../components/header';
import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Gallery } from '../../components/gallery';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { FloatingCta } from '../../components/floating-cta';
import { TrainingPlans } from './components/training-plans';
import { ResultsBanner } from './components/results-banner';

interface Props {
  content: SketchContent;
}

/**
 * Fitness trainer layout — intensity, transformation, social proof.
 *
 * Order vs the doula layout:
 *   1. Hero — strong, action-oriented (uses owner's IG image with stronger overlay)
 *   2. ResultsBanner — "X לקוחים שינו את החיים" stat strip with social proof
 *   3. TrainingPlans — services rendered as packages (3/6/12 weeks) with "popular" badge
 *   4. Gallery — workout shots, transformation moments
 *   5. Testimonials — client wins
 *   6. About — the trainer's story (later than doula because for fitness, results > origin)
 *   7. Contact — strong CTA, "התחל היום"
 *
 * The reasoning: fitness customers convert on RESULTS, not on the trainer's
 * personal story. So we lead with social proof + program structure, and only
 * THEN tell the story. Conversion psychology specific to this archetype.
 */
export function FitnessTrainerLayout({ content }: Props) {
  return (
    <>
      <Header branding={content.branding} />
      <main>
        <Hero hero={content.hero} branding={content.branding} trust={content.trust} />
        <ResultsBanner
          themeColor={content.branding.themeColor}
          testimonialCount={content.testimonials?.length ?? 0}
          galleryCount={content.gallery?.length ?? 0}
        />
        <TrainingPlans services={content.services} themeColor={content.branding.themeColor} />
        <Gallery images={content.gallery} />
        <Testimonials items={content.testimonials ?? []} />
        <About about={content.about} />
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
