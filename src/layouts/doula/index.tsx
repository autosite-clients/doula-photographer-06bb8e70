import type { SketchContent } from '../../types';

import { Header } from '../../components/header';
import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Services } from '../../components/services';
import { Gallery } from '../../components/gallery';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { FloatingCta } from '../../components/floating-cta';
import { ProcessTimeline } from '../../components/process-timeline';
import { Faq } from '../../components/faq';

interface Props {
  content: SketchContent;
}

/**
 * Doula / service-provider layout: solo professionals (doulas, midwives,
 * photographers, coaches, lactation consultants).
 *
 * Order: Hero → About → Services → ProcessTimeline → Gallery → Testimonials
 *        → FAQ → Contact.
 *
 * Section visibility honors `content.selectedSections` (set by the customer
 * via the onboarding section picker). When undefined, all sections render
 * (backward compat). Hero is always rendered.
 */
export function DoulaLayout({ content }: Props) {
  // When the customer explicitly picked sections, only show those. Otherwise
  // show everything (includes() on undefined falls back to a permissive check).
  const picked = content.selectedSections;
  const show = (key: string): boolean => !picked || picked.includes(key);

  return (
    <>
      <Header branding={content.branding} />
      <main>
        <Hero hero={content.hero} branding={content.branding} trust={content.trust} />
        {show('about') && <About about={content.about} />}
        {show('services') && (
          <Services items={content.services} themeColor={content.branding.themeColor} />
        )}
        {show('process') && (
          <ProcessTimeline
            steps={content.processSteps}
            themeColor={content.branding.themeColor}
          />
        )}
        {show('gallery') && <Gallery images={content.gallery} />}
        {show('testimonials') && (
          <Testimonials items={content.testimonials ?? []} />
        )}
        {show('faq') && (
          <Faq items={content.faq} themeColor={content.branding.themeColor} />
        )}
        {show('contact') && (
          <Contact
            contact={content.contact}
            businessName={content.branding.businessName}
            themeColor={content.branding.themeColor}
          />
        )}
      </main>
      <FloatingCta
        whatsappNumber={content.contact.whatsappNumber}
        phone={content.contact.phone}
        themeColor={content.branding.themeColor}
      />
    </>
  );
}
