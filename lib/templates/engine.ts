/**
 * lib/templates/engine.ts — the document template engine.
 *
 * Templates are authored as plain TypeScript modules that export a
 * DocumentTemplate object. Each template declares variables, default
 * values, jurisdictional notes, and a `render(values)` function that
 * produces the body string.
 *
 * The engine resolves a (slug, jurisdiction) pair to a template, applies
 * the variables, and returns the rendered body + the variables it would
 * have liked to capture but couldn't infer. Missing-variable lists feed
 * into the public document generator's "we need a few more details" UI
 * (Wave 2 polish).
 *
 * Sign-off Doctrine: every rendered body is wrapped with the
 * DRAFT watermark + carve-out language. The watermark is removed only
 * after a SignoffRequest is approved.
 */

export type Jurisdiction = "NZ" | "AU" | "UK" | "US";

export interface TemplateVariable {
  key: string;
  label: string;
  required?: boolean;
  /** A hint for the variable extractor / form UI. */
  hint?: string;
  /** Default placeholder text inserted when the variable is unresolved. */
  placeholder?: string;
  /** Example value to show the user. */
  example?: string;
}

export interface DocumentTemplate {
  slug: string;
  jurisdiction: Jurisdiction;
  /** Display label for this jurisdictional variant. */
  label: string;
  /** One-line summary used in admin / firm-side previews. */
  summary: string;
  /** Statutory authorities the template observes. */
  authorities: ReadonlyArray<string>;
  /** Variable contract — the engine will fill these into the body. */
  variables: ReadonlyArray<TemplateVariable>;
  render: (values: Record<string, string>) => string;
  /** Free-text notes for the reviewing professional. */
  reviewerNotes?: string;
}

/** Substitutes {{key}} placeholders in a string with values. Missing keys
 *  fall back to the variable's placeholder, or "[<label>]" if no default. */
export function substitute(
  body: string,
  variables: ReadonlyArray<TemplateVariable>,
  values: Record<string, string>,
): { body: string; missing: string[] } {
  const missing: string[] = [];
  const out = body.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const provided = values[key]?.trim();
    if (provided) return provided;
    const variable = variables.find((v) => v.key === key);
    if (variable?.placeholder) return variable.placeholder;
    if (variable?.required && !provided) missing.push(key);
    return `[${variable?.label ?? key}]`;
  });
  return { body: out, missing };
}

/** Standard watermark + carve-out wrapper applied to every rendered draft. */
export function wrapWithWatermark(opts: {
  body: string;
  jurisdiction: Jurisdiction;
  templateLabel: string;
}): string {
  const { body, jurisdiction, templateLabel } = opts;
  const lines = [
    `# ${templateLabel}`,
    "",
    `**Jurisdiction:** ${jurisdiction}`,
    `**Status:** DRAFT — pending professional sign-off`,
    "",
    "---",
    "",
    body,
    "",
    "---",
    "",
    "## Watermark + carve-out",
    "",
    "**This document is a DRAFT. It is not legal/tax advice and is not legally binding until a credentialled professional in the relevant jurisdiction reviews it and signs it through Marco Reid's SignoffRequest queue. Once signed, the professional's name, credential, registration number, jurisdiction, and date will be stamped on every page of the released document.**",
    "",
    "Marco Reid is a tooling vendor. The named professional on the signed document carries the regulatory authority for the advice and the work product.",
    "",
    "Non-waivable consumer rights under the NZ Consumer Guarantees Act 1993 and Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010), and equivalent UK and US state consumer-protection regimes, are preserved.",
  ];
  return lines.join("\n");
}

/** Registry — populated at module load time by individual template files. */
const REGISTRY = new Map<string, DocumentTemplate>();

export function registerTemplate(template: DocumentTemplate): void {
  REGISTRY.set(`${template.slug}::${template.jurisdiction}`, template);
}

export function findTemplate(
  slug: string,
  jurisdiction: Jurisdiction,
): DocumentTemplate | undefined {
  return REGISTRY.get(`${slug}::${jurisdiction}`);
}

export function listTemplates(): DocumentTemplate[] {
  return Array.from(REGISTRY.values());
}

export function templatesForSlug(slug: string): DocumentTemplate[] {
  return listTemplates().filter((t) => t.slug === slug);
}

export function templatesForJurisdiction(
  jurisdiction: Jurisdiction,
): DocumentTemplate[] {
  return listTemplates().filter((t) => t.jurisdiction === jurisdiction);
}
