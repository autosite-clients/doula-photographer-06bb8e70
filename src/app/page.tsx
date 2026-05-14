import { content } from '../content';
import { DoulaLayout } from '../layouts/doula';
import { PhysicalPlaceLayout } from '../layouts/physical-place';
import { FitnessTrainerLayout } from '../layouts/fitness-trainer';
import { PhotographerLayout } from '../layouts/photographer';
import { ClinicLayout } from '../layouts/clinic';
import { StudioLayout } from '../layouts/studio';
import { StructuredData } from '../components/structured-data';

/**
 * Root route — the customer's actual website lives here. Picks the layout
 * based on the templateId field baked into site-content.json by the Site
 * Builder agent. Defaults to the doula layout if no match.
 */
export default function Home() {
  const templateId = (content as { templateId?: string }).templateId ?? 'doula-photographer';
  return (
    <>
      {pickLayout(templateId)}
      <StructuredData content={content} templateId={templateId} />
    </>
  );
}

function pickLayout(templateId: string) {
  switch (templateId) {
    case 'restaurant':
    case 'physical-place':
    case 'beauty-salon':
    case 'barber':
      return <PhysicalPlaceLayout content={content} />;
    case 'fitness-trainer':
      return <FitnessTrainerLayout content={content} />;
    case 'photographer':
      return <PhotographerLayout content={content} />;
    case 'clinic':
      return <ClinicLayout content={content} />;
    case 'studio':
      return <StudioLayout content={content} />;
    case 'doula-photographer':
    default:
      return <DoulaLayout content={content} />;
  }
}
