import type { SketchContent } from '../types';

interface Props {
  content: SketchContent;
  templateId: string;
}

/**
 * Schema.org structured data (JSON-LD) — emits the right schema type per
 * archetype so Google understands what kind of business this is.
 *
 * Why this matters:
 *   - Google shows rich results (star ratings, hours, phone) directly in SERPs
 *   - LocalBusiness schema is a major ranking signal for local intent searches
 *   - Without it, we miss free traffic from "{business type} near me" queries
 *
 * Schema types per archetype:
 *   physical-place    → Restaurant / CafeOrCoffeeShop / BeautySalon (industry-specific)
 *   clinic            → MedicalBusiness / Dentist
 *   fitness-trainer   → SportsActivityLocation / HealthClub
 *   photographer      → ProfessionalService
 *   studio            → EducationalOrganization / SportsActivityLocation
 *   doula-photographer → LocalBusiness (generic professional service)
 */
export function StructuredData({ content, templateId }: Props) {
  const schemaType = pickSchemaType(templateId);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: content.branding.businessName,
    description: content.seo.description,
  };

  if (content.branding.logoUrl) data.logo = content.branding.logoUrl;
  if (content.hero.image?.src) data.image = content.hero.image.src;
  if (content.contact.phone) data.telephone = content.contact.phone;
  if (content.contact.email) data.email = content.contact.email;
  if (content.contact.address) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: content.contact.address,
      addressCountry: 'IL',
    };
  }
  if (content.contact.workingHours) {
    // Generic — when we have structured day-by-day hours, emit openingHoursSpecification
    data.openingHours = content.contact.workingHours;
  }
  if (content.contact.instagramHandle) {
    data.sameAs = [`https://instagram.com/${content.contact.instagramHandle}`];
  }

  // Aggregate testimonial rating if we have ratings on items
  const ratings = (content.testimonials ?? [])
    .map((t) => t.rating)
    .filter((r): r is number => typeof r === 'number');
  if (ratings.length >= 3) {
    const avg = ratings.reduce((s, r) => s + r, 0) / ratings.length;
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: ratings.length,
    };
  }

  // Services as offerings
  if (content.services.length > 0) {
    data.makesOffer = content.services.slice(0, 8).map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.description },
    }));
  }

  // FAQ structured data — Google shows expandable Q&A in SERP
  const faqJson =
    content.faq && content.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faq.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        // Stringify is safe — we control the data, no user-injected XSS path
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      {faqJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
        />
      )}
    </>
  );
}

function pickSchemaType(templateId: string): string {
  switch (templateId) {
    case 'physical-place':
    case 'restaurant':
      // Restaurant covers cafes, the most common use of physical-place
      return 'Restaurant';
    case 'beauty-salon':
    case 'barber':
      return 'BeautySalon';
    case 'clinic':
      return 'MedicalBusiness';
    case 'fitness-trainer':
      return 'SportsActivityLocation';
    case 'photographer':
      return 'ProfessionalService';
    case 'studio':
      return 'EducationalOrganization';
    default:
      return 'LocalBusiness';
  }
}
