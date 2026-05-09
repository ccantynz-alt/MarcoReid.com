/**
 * lib/templates/index.ts — entry point.
 *
 * Importing this module side-effect-registers every template into the
 * engine registry. Add new template files to the imports below and they
 * are picked up automatically by /api/generate/intake.
 */

// Side-effect imports — each module calls registerTemplate() at load.
import "./nda";
import "./employment";
import "./will";
import "./shareholders-agreement";
import "./lease";
import "./power-of-attorney";
import "./sale-of-goods";
import "./directors-resolution";

// Re-export the engine API.
export {
  findTemplate,
  listTemplates,
  templatesForSlug,
  templatesForJurisdiction,
  substitute,
  wrapWithWatermark,
  type DocumentTemplate,
  type Jurisdiction,
  type TemplateVariable,
} from "./engine";
