import type { SketchContent } from '../../types';

import { Header } from '../../components/header';
import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { FloatingCta } from '../../components/floating-cta';
import { ProcessTimeline } from '../../components/process-timeline';
import { Faq } from '../../components/faq';
import { PortfolioGrid } from './components/portfolio-grid';
import { PackagesGrid } from './components/packages-grid';

interface Props {
  content: SketchContent;
}

/**
 * Photographer layout — visual-first.
 *
 * For photographers, customers buy what they SEE. So the structure leads with
 * portfolio (the work itself) and only secondarily with copy.
 *
 * Order:
 *   1. Hero — full-bleed photo with minimal text
 *   2. PortfolioGrid — generous, gallery-first (NOT a small thumb strip)
 *   3. About — the photographer's vision/style
 *   4. PackagesGrid — packages as visual cards (each with a representative photo)
 *   5. Testimonials — short, punchy
 *   6. Contact — straightforward
 *
 * Key difference from doula: gallery is HUGE and FIRST, because for photographers
 * portfolio = product. Doulas don't have a "portfolio" in that sense.
 */
export function PhotographerLayout({ content }: Props) {
  return (
    <>
      <Header branding={content.branding} />
      <main>
        <Hero hero={content.hero} branding={content.branding} trust={content.trust} />
        <PortfolioGrid images={content.gallery} themeColor={content.branding.themeColor} />
        <About about={content.about} />
        <ProcessTimeline
          steps={content.processSteps}
          themeColor={content.branding.themeColor}
          headline="ככה נצלם יחד"
        />
        <PackagesGrid services={content.services} themeColor={content.branding.themeColor} />
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
