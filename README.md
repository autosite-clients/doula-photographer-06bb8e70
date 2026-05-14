# Template: doula-photographer

This is a **standalone Next.js template** generated from the AutoSite monorepo.
Each customer's website is generated from this template by the Site Builder
agent (`apps/api/src/agents/site-builder/`), which:

1. Calls GitHub's "Generate from template" API → creates a new private repo
   under `autosite-clients/` from this template
2. Overwrites `src/site-content.json` with the customer's sketch content
3. Creates a Vercel project pointing at the new repo
4. Triggers a production deployment

## Do NOT edit this repo manually

Changes here will NOT propagate to existing customer sites. To update the
template:

1. Edit the source under `apps/site-templates/doula-photographer/` in the
   AutoSite monorepo
2. Run `node scripts/template-prep.mjs doula-photographer`
3. Commit + push the regenerated output to this repo

## Local preview

```bash
npm install
npm run dev
# Open http://localhost:3000 — renders the sample content in src/site-content.json
```

## Architecture

- `src/site-content.json` — placeholder. Real customers' content is baked
  in by the Site Builder agent at deploy time.
- `src/content.ts` — imports the JSON, exports as typed `SketchContent`.
- `src/types.ts` — inlined type definitions (no workspace dependencies).
- `src/layouts/` — 6 archetype-specific page compositions.
- `src/components/` — reusable section components (Hero, About, etc.).
- `src/app/page.tsx` — root route. Picks the right layout based on
  `templateId` in site-content.json.
