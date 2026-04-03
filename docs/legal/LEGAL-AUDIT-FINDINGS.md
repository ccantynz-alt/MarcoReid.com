# Legal Pages Compliance Audit — Findings for Attorney Review

**Audit date:** 3 April 2026
**Status:** 2 critical items already fixed (placeholders, IP Holdings). Remaining 16 items require attorney review.

## Items Already Fixed

1. [TBD] company number placeholders — removed from Terms and Privacy
2. IP Holdings Ltd missing from Terms of Service — added

## Tier 1 — Fix Before Publishing (Attorney Must Review)

3. **GDPR response timeline** — Privacy Policy Section 9 missing 30-day statutory response deadline
4. **Arbitration asymmetry** — US users get arbitration, non-US get full court litigation. Consider uniform approach.
5. **Class action waiver** — Unenforceable in UK/AU/NZ as currently drafted. Need "to the maximum extent permitted by applicable law" savings clause.
6. **Subprocessor list** — Privacy Policy Section 6.1 doesn't list specific subprocessors (Anthropic, Stripe, Plaid, cloud provider). Required for GDPR/UK GDPR.
7. **DPA incorporation** — Terms Section 9 says DPA "available upon request for enterprise customers." Should be automatic for all users where GDPR/UK GDPR/NZ Privacy Act applies.

## Tier 2 — Fix Before Launch to Users

8. **Trust accounting indemnity** — Add specific indemnification for user trust accounting violations to Section 13.
9. **IP infringement carve-out** — Liability cap should not apply to AlecRae's own IP infringement of third-party rights.
10. **Hallucination prevention definition** — AUP Section 3.2 prohibits circumventing systems that aren't defined. Specify what they are.
11. **Age verification** — Privacy Section 13 says no children but provides no verification mechanism.
12. **UK terms separation** — Consider separate UK-specific terms with UK law and UK jurisdiction for UK consumers.
13. **PI insurance disclosure** — Disclose that AlecRae maintains professional indemnity insurance but it doesn't cover user reliance on unverified AI output.
14. **Cookie tracking specifics** — Privacy Section 10 denies third-party tracking but doesn't list specific analytics tools used.
15. **CCPA "sale" definition** — Privacy Section 9.4 claims "we do not sell" but CCPA defines sale broadly. Need explicit opt-out mechanism.

## Tier 3 — Enhance Post-Launch

16. **Modification notice period** — Consider extending from 30 to 60 days for material changes.
17. **Regulatory investigation carve-out** — Explicit clause allowing cooperation with law enforcement.
18. **Audit rights** — Professional users should be able to request security/compliance audit evidence.
19. **Benchmarking restriction** — AUP Section 3.7 is too broad. Should not prohibit neutral academic research or factual comparisons.
20. **Monitoring transparency** — AUP Section 5 needs more detail on automated detection methods for GDPR compliance.

## Litigation Vulnerability Summary

| Attack vector | Risk | Mitigation needed |
|---|---|---|
| US class action | Medium | Class action waiver needs savings clause |
| UK consumer protection | Medium-High | Separate UK terms recommended |
| AU Consumer Law | Medium | Carve out "major failures" from liability cap |
| NZ Consumer Guarantees | Low-Medium | Define "business purposes" more clearly |
| IP infringement | Medium | Add carve-out from liability cap |
| Professional regulation | Low | Add AI disclosure recommendation for users |

## Overall Score: 7.4/10

The foundation is solid. These refinements bring it to 9+/10 when addressed by qualified counsel.
