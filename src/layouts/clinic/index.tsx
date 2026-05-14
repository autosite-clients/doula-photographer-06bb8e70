import type { SketchContent } from '../../types';

import { Header } from '../../components/header';
import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Gallery } from '../../components/gallery';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { FloatingCta } from '../../components/floating-cta';
import { Faq } from '../../components/faq';
import { TeamSection } from './components/team-section';
import { TreatmentsList } from './components/treatments-list';
import { ClinicLocation } from './components/clinic-location';

interface Props {
  content: SketchContent;
}

/**
 * Multi-therapist Clinic layout — for clinics with multiple specialists.
 *
 * Use cases: dental clinics, integrative medicine, aesthetics, family medical
 * practices, beauty salons with multiple stylists, mental health practices.
 *
 * Why this differs from doula/physical-place:
 *   - Customers care about WHO will treat them (the team is the product)
 *   - Treatments often need short descriptions + duration (not a full menu)
 *   - Trust signals (years of practice, certifications, board memberships)
 *     matter more than personal story
 *   - Location + parking + accessibility is critical for medical visits
 *
 * Order:
 *   1. Hero — clinic exterior or warm interior (NOT a single person — it's a team)
 *   2. About — the clinic's philosophy/approach (collective voice, "אנחנו")
 *   3. Treatments — list of services with rough duration estimates
 *   4. Team — staff cards (the most distinctive section for this archetype)
 *   5. Gallery — clinic interior + atmosphere shots
 *   6. Testimonials — patient experiences
 *   7. Location — full location section with accessibility info
 *   8. Contact — booking form / call CTA
 */
export function ClinicLayout({ content }: Props) {
  return (
    <>
      <Header branding={content.branding} />
      <main>
        <Hero hero={content.hero} branding={content.branding} trust={content.trust} />
        <About about={content.about} />
        <TreatmentsList items={content.services} themeColor={content.branding.themeColor} />
        <TeamSection
          businessName={content.branding.businessName}
          themeColor={content.branding.themeColor}
        />
        <Gallery images={content.gallery} />
        <Testimonials items={content.testimonials ?? []} />
        <Faq items={content.faq} themeColor={content.branding.themeColor} />
        <ClinicLocation
          contact={content.contact}
          businessName={content.branding.businessName}
          themeColor={content.branding.themeColor}
        />
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
