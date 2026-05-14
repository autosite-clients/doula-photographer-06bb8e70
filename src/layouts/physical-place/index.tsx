import type { SketchContent } from '../../types';

import { Header } from '../../components/header';
import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Gallery } from '../../components/gallery';
import { Testimonials } from '../../components/testimonials';
import { Contact } from '../../components/contact';
import { FloatingCta } from '../../components/floating-cta';
import { MenuSection } from './components/menu-section';
import { LocationSection } from './components/location-section';

interface Props {
  content: SketchContent;
}

/**
 * Physical-place layout: cafés, restaurants, salons, clinics — businesses where
 * "where are you and when are you open" matters as much as "what do you do".
 *
 * Order vs the doula layout:
 *   1. Hero (with bg image)
 *   2. Atmosphere ("about" section reframed)
 *   3. Menu/Offerings (services rendered as menu, not feature cards)
 *   4. Gallery
 *   5. Testimonials (Google reviews if no IG)
 *   6. Location (map + address + hours - prominent)
 *   7. Contact (final CTA)
 */
export function PhysicalPlaceLayout({ content }: Props) {
  return (
    <>
      <Header branding={content.branding} />
      <main>
        <Hero hero={content.hero} branding={content.branding} trust={content.trust} />
        <About about={content.about} />
        <MenuSection items={content.services} themeColor={content.branding.themeColor} />
        <Gallery images={content.gallery} />
        <Testimonials items={content.testimonials ?? []} />
        <LocationSection
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
