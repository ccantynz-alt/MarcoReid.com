/**
 * Sale of goods templates — NZ / AU / UK / US.
 *
 * B2B sale of goods contract. Each jurisdiction's variant respects the
 * mandatory consumer-protection regime; for B2C transactions, additional
 * statutory implied terms apply that cannot be excluded.
 *
 *   - NZ: Contract and Commercial Law Act 2017 + Sale of Goods provisions
 *     (formerly Sale of Goods Act 1908). For consumer sales, Consumer
 *     Guarantees Act 1993 implies non-excludable guarantees.
 *   - AU: Sale of Goods Acts state-by-state (NSW, Vic etc.) + Australian
 *     Consumer Law (Schedule 2 Competition and Consumer Act 2010) for
 *     consumer transactions.
 *   - UK: Sale of Goods Act 1979 (B2B) + Consumer Rights Act 2015 (B2C —
 *     non-excludable). Hierarchy of remedies in CRA 2015 Pt 1.
 *   - US: Uniform Commercial Code Article 2 (sale of goods) — adopted
 *     in all 50 states. Magnuson-Moss Warranty Act for consumer products.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "sellerName",
    label: "Seller full legal name",
    required: true,
    placeholder: "[Seller's full legal name]",
    example: "Acme Manufacturing Limited",
  },
  {
    key: "sellerAddress",
    label: "Seller address",
    placeholder: "[Seller's address]",
    example: "12 Industry Way, Auckland 1010",
  },
  {
    key: "buyerName",
    label: "Buyer full legal name",
    required: true,
    placeholder: "[Buyer's full legal name]",
    example: "Beta Distribution Pty Ltd",
  },
  {
    key: "buyerAddress",
    label: "Buyer address",
    placeholder: "[Buyer's address]",
    example: "100 Commerce Street, Sydney NSW 2000",
  },
  {
    key: "goodsDescription",
    label: "Goods description (specs, quantities, identifying detail)",
    required: true,
    placeholder: "[Description of the goods — make, model, quantity, specs]",
    example:
      "500 units of Widget Pro v3.2, manufactured to specification ANSI/ISO 12345, packed in cartons of 50",
  },
  {
    key: "price",
    label: "Total price",
    required: true,
    placeholder: "[Total price + currency]",
    example: "NZD $125,000 plus GST",
  },
  {
    key: "deliveryTerms",
    label: "Delivery terms (Incoterms 2020 if international)",
    placeholder: "[Delivery terms]",
    example: "FCA Auckland (Incoterms 2020)",
  },
  {
    key: "deliveryDate",
    label: "Delivery date",
    placeholder: "[Delivery date]",
    example: "30 September 2026",
  },
  {
    key: "paymentTerms",
    label: "Payment terms",
    placeholder: "30 days from invoice",
    example: "30 days from date of invoice",
  },
  {
    key: "executionDate",
    label: "Execution date",
    placeholder: "[Execution date]",
    example: "1 June 2026",
  },
];

// === NZ ===
registerTemplate({
  slug: "sale-of-goods",
  jurisdiction: "NZ",
  label: "Sale of Goods Contract (New Zealand · B2B)",
  summary:
    "NZ B2B sale of goods contract under Contract and Commercial Law Act 2017. Standard delivery, payment, risk, title, and warranty clauses. For sales to consumers, the non-excludable guarantees under the Consumer Guarantees Act 1993 apply additionally.",
  authorities: [
    "Contract and Commercial Law Act 2017 (Pt 3 — Sale of Goods)",
    "Consumer Guarantees Act 1993 (B2C — non-excludable guarantees)",
    "Fair Trading Act 1986 — misleading conduct + unfair contract terms",
    "Personal Property Securities Act 1999 (where retention of title creates a security interest)",
    "GST Act 1985",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "B2B contract — Consumer Guarantees Act non-excludable guarantees do not apply. If the buyer is or may be a consumer, CGA 1993 applies and cannot be contracted out of (s 43). Retention-of-title clauses create a PMSI under the PPSA 1999 — must be perfected via PPSR registration to be enforceable in the buyer's insolvency. Fair Trading Act 1986 unfair-terms regime (Pt 4A) applies to standard-form small-business contracts since 16 August 2022 — review for any unfair-term risk.",
  render: (values) => {
    const body = `## Sale of Goods Contract

**Date:** {{executionDate}}

**Between:**

(1) **{{sellerName}}** of {{sellerAddress}} (the **"Seller"**); and

(2) **{{buyerName}}** of {{buyerAddress}} (the **"Buyer"**).

### 1. Sale and purchase

1.1 The Seller agrees to sell and the Buyer agrees to purchase the following goods (the **"Goods"**):

{{goodsDescription}}

### 2. Price and payment

2.1 The total price for the Goods is **{{price}}**.

2.2 Payment terms: **{{paymentTerms}}**.

2.3 The Seller may charge interest on overdue amounts at 2% per month (or part month) from the due date until paid in full.

### 3. Delivery

3.1 The Seller will deliver the Goods on **{{deliveryDate}}** in accordance with the terms: **{{deliveryTerms}}**.

3.2 The Buyer must accept delivery on the date specified or pay reasonable storage charges if delivery is delayed at the Buyer's request.

### 4. Risk and title

4.1 Risk in the Goods passes to the Buyer on delivery.

4.2 **Retention of title:** Title in the Goods does not pass to the Buyer until the Buyer has paid in full all amounts owing to the Seller (whether under this contract or otherwise). Until title passes, the Buyer holds the Goods as bailee for the Seller and must keep the Goods identifiable and insured. The Buyer acknowledges that this clause creates a purchase money security interest under the Personal Property Securities Act 1999, which the Seller may register on the PPSR.

### 5. Warranties

5.1 The Seller warrants that the Goods:
(a) correspond with the description in clause 1;
(b) are of merchantable quality (Contract and Commercial Law Act 2017 s 138);
(c) are fit for the purpose disclosed by the Buyer (where the Buyer has relied on the Seller's skill or judgement) (s 139);
(d) are free from any encumbrance not disclosed to the Buyer.

5.2 The Buyer must inspect the Goods and notify the Seller of any defect within 14 days of delivery. Failure to notify within that period is deemed acceptance of the Goods.

### 6. Limitation of liability

6.1 The Seller's liability for any breach is limited to:
(a) replacement of the defective Goods; or
(b) refund of the price paid for the defective Goods,

at the Seller's option.

6.2 The Seller is not liable for indirect, consequential, or economic loss.

6.3 Nothing in this contract excludes any non-excludable guarantee under the Consumer Guarantees Act 1993 (where applicable).

### 7. Force majeure

7.1 Neither party is liable for delay or failure to perform if caused by an event beyond its reasonable control, including act of God, government action, war, pandemic, or supply-chain disruption.

### 8. Termination

8.1 Either party may terminate this contract by written notice if the other party commits a material breach not remedied within 14 days of notice.

### 9. Governing law

9.1 This contract is governed by New Zealand law. The parties submit to the non-exclusive jurisdiction of the High Court of New Zealand.

### 10. Entire agreement

10.1 This contract is the entire agreement between the parties on the matters it covers.

---

**Signed by the Seller on {{executionDate}}:**

Signature: ____________________________

Name + Title:

**Signed by the Buyer on {{executionDate}}:**

Signature: ____________________________

Name + Title:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "sale-of-goods",
  jurisdiction: "AU",
  label: "Sale of Goods Contract (Australia · B2B)",
  summary:
    "AU B2B sale of goods contract under state Sale of Goods Acts. For sales to consumers (or small businesses paying ≤ $100k or ≤ $1M for goods/services on standard form), Australian Consumer Law guarantees + unfair-contract-terms regime apply additionally.",
  authorities: [
    "Sale of Goods Act 1923 (NSW), 1958 (Vic), 1896 (Qld), 1895 (SA), 1895 (WA), 1896 (Tas)",
    "Australian Consumer Law (Schedule 2 Competition and Consumer Act 2010) — consumer guarantees + unfair contract terms",
    "Personal Property Securities Act 2009 (Cth) — retention of title PMSI",
    "GST Act 1999",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "B2B contract. ACL consumer guarantees apply where the buyer is a consumer (s 3 ACL — generally < $100k purchase or goods of a kind ordinarily acquired for personal use). ACL unfair contract terms regime (ss 23–28) applies to standard-form contracts where one party has < 100 employees + the contract is < $5M (post-Nov 2023 expanded). Retention-of-title creates a PMSI under PPSA 2009 — registration on PPSR within 15 business days of delivery is required for super-priority. State-by-state Sale of Goods Acts are largely harmonised.",
  render: (values) => {
    const body = `## Sale of Goods Contract

**Date:** {{executionDate}}

**Parties:**

(1) **{{sellerName}}** of {{sellerAddress}} (the **"Seller"**); and

(2) **{{buyerName}}** of {{buyerAddress}} (the **"Buyer"**).

### 1. Sale and purchase

1.1 The Seller agrees to sell and the Buyer agrees to purchase the following goods (the **"Goods"**):

{{goodsDescription}}

### 2. Price and payment

2.1 The total price for the Goods is **{{price}}**.

2.2 Payment terms: **{{paymentTerms}}**.

2.3 Overdue amounts attract interest at 2% per month or part month.

### 3. Delivery

3.1 Delivery on **{{deliveryDate}}** under: **{{deliveryTerms}}**.

3.2 The Buyer accepts the Goods on delivery. Storage charges apply if delivery is delayed at the Buyer's request.

### 4. Risk and title

4.1 Risk passes to the Buyer on delivery.

4.2 **Retention of title:** Title remains with the Seller until the Buyer pays in full. Until then, the Buyer holds the Goods as bailee for the Seller. This clause creates a Purchase Money Security Interest under the Personal Property Securities Act 2009 (Cth), which the Seller may register on the PPSR.

### 5. Statutory and contractual warranties

5.1 The Seller warrants that the Goods correspond with the description, are of merchantable quality, and are fit for any purpose communicated to the Seller in writing.

5.2 Statutory implied terms under the relevant state Sale of Goods Act apply. **For consumer transactions, the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010) provides non-excludable consumer guarantees, which take precedence over any inconsistent term in this contract.**

5.3 The Buyer must notify the Seller of any defect within 14 days of delivery.

### 6. Limitation of liability

6.1 To the extent permitted by law, the Seller's liability is limited to:
(a) replacement of the defective Goods; or
(b) refund of the price paid,

at the Seller's option.

6.2 The Seller is not liable for indirect, consequential, or economic loss.

6.3 **Nothing in this contract limits any non-excludable consumer guarantee under the Australian Consumer Law.**

### 7. Force majeure

7.1 Neither party is liable for delay caused by an event beyond reasonable control.

### 8. Termination

8.1 Either party may terminate for material breach not remedied within 14 days of written notice.

### 9. Governing law

9.1 This contract is governed by the laws of New South Wales (or the relevant state). The parties submit to the non-exclusive jurisdiction of the Supreme Court of NSW + Federal Court of Australia.

### 10. Entire agreement

10.1 This contract is the entire agreement between the parties.

---

**Signed by the Seller:**

Signature: ____________________________

Name + Title:

**Signed by the Buyer:**

Signature: ____________________________

Name + Title:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "sale-of-goods",
  jurisdiction: "UK",
  label: "Sale of Goods Contract (England & Wales · B2B)",
  summary:
    "UK B2B sale of goods contract under Sale of Goods Act 1979. For B2C transactions, the Consumer Rights Act 2015 applies and overrides — non-excludable hierarchy of remedies in Part 1.",
  authorities: [
    "Sale of Goods Act 1979 — B2B implied terms (ss 12–15A)",
    "Consumer Rights Act 2015 — B2C transactions, non-excludable",
    "Unfair Contract Terms Act 1977 — limitation of liability test",
    "Late Payment of Commercial Debts (Interest) Act 1998 — statutory interest",
    "VAT Act 1994",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "B2B contract under SGA 1979. Implied terms (description s 13, satisfactory quality s 14, fitness for purpose s 14(3), sample s 15) apply. CRA 2015 overrides for B2C — non-excludable. Late Payment of Commercial Debts (Interest) Act 1998 entitles the seller to 8% above Bank of England base rate as statutory interest unless otherwise contractually agreed at a rate that is a substantial remedy. UCTA 1977 reasonableness test applies to limitation-of-liability clauses in B2B.",
  render: (values) => {
    const body = `## Sale of Goods Contract

**Date:** {{executionDate}}

**Between:**

(1) **{{sellerName}}** of {{sellerAddress}} (the **"Seller"**); and

(2) **{{buyerName}}** of {{buyerAddress}} (the **"Buyer"**).

### 1. Sale and purchase

1.1 The Seller agrees to sell and the Buyer agrees to purchase the following goods (the **"Goods"**):

{{goodsDescription}}

### 2. Price and payment

2.1 The total price is **{{price}}**.

2.2 Payment terms: **{{paymentTerms}}**.

2.3 The Buyer shall pay statutory interest on any overdue amount at the rate provided by the Late Payment of Commercial Debts (Interest) Act 1998.

### 3. Delivery

3.1 Delivery on **{{deliveryDate}}** under: **{{deliveryTerms}}**.

### 4. Risk and title

4.1 Risk in the Goods passes to the Buyer on delivery.

4.2 **Retention of title:** Title in the Goods does not pass to the Buyer until the Buyer has paid in full. Until then, the Buyer holds the Goods as bailee for the Seller, must keep them identifiable, and must insure them.

### 5. Implied terms

5.1 The implied terms of the Sale of Goods Act 1979 apply, including:
(a) the Seller has the right to sell the Goods (s 12);
(b) the Goods correspond with their description (s 13);
(c) the Goods are of satisfactory quality (s 14(2));
(d) the Goods are fit for any purpose made known to the Seller (s 14(3));
(e) where sold by sample, the bulk corresponds with the sample (s 15).

5.2 **For B2C contracts, the Consumer Rights Act 2015 applies and the Buyer's statutory rights cannot be excluded.**

### 6. Limitation of liability

6.1 Subject to clause 6.3, the Seller's total liability is limited to the price paid for the Goods.

6.2 The Seller is not liable for indirect, consequential, or economic loss, including loss of profit, loss of revenue, or loss of business.

6.3 Nothing in this contract excludes or limits liability for:
(a) death or personal injury caused by negligence;
(b) fraud or fraudulent misrepresentation;
(c) breach of the Sale of Goods Act 1979 s 12 implied term as to title;
(d) any liability that cannot be excluded by law.

6.4 The limitations in this clause are reasonable for the purposes of the Unfair Contract Terms Act 1977.

### 7. Force majeure

7.1 Neither party is liable for delay caused by an event beyond reasonable control.

### 8. Termination

8.1 Either party may terminate for material breach not remedied within 14 days of written notice.

### 9. Governing law

9.1 This contract is governed by the laws of England and Wales.

9.2 The parties submit to the exclusive jurisdiction of the courts of England and Wales.

### 10. Entire agreement

10.1 This contract is the entire agreement between the parties on the matters it covers.

---

**Signed by the Seller:**

Signature: ____________________________

Name + Title:

**Signed by the Buyer:**

Signature: ____________________________

Name + Title:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "sale-of-goods",
  jurisdiction: "US",
  label: "Sale of Goods Contract (United States · UCC Article 2)",
  summary:
    "US sale of goods contract under Uniform Commercial Code Article 2 (adopted in all 50 states). For consumer goods, Magnuson-Moss Warranty Act applies. International B2B sales may be governed by CISG (Vienna Convention) — opt out if undesired.",
  authorities: [
    "Uniform Commercial Code Article 2 (Sale of Goods) — adopted in all 50 states",
    "UCC § 2-302 — unconscionable contracts",
    "UCC §§ 2-313 to 2-315 — express + implied warranties",
    "Magnuson-Moss Warranty Act (15 U.S.C. §§ 2301–2312) — consumer warranties",
    "CISG (Vienna Convention) — international sales unless opted out",
    "State-specific consumer-protection statutes",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "UCC Article 2 governs unless the parties opt out (rare for B2B). For international sales between parties in CISG-signatory states, CISG applies unless opted out — express opt-out in clause 9 if domestic UCC is desired. Magnuson-Moss Warranty Act applies to written warranties on consumer goods. State-specific lemon laws and consumer-protection acts often supplement; verify per buyer's state. UCC § 2-201 statute of frauds: contracts > $500 must be in writing.",
  render: (values) => {
    const body = `## Sale of Goods Contract

**Effective:** {{executionDate}}

**Between:**

(1) **{{sellerName}}** of {{sellerAddress}} ("**Seller**"); and

(2) **{{buyerName}}** of {{buyerAddress}} ("**Buyer**").

### 1. Sale and purchase

1.1 Seller agrees to sell and Buyer agrees to purchase the following goods (the "**Goods**"):

{{goodsDescription}}

### 2. Price and payment

2.1 The total price is **{{price}}**.

2.2 Payment terms: **{{paymentTerms}}**.

2.3 Past-due amounts accrue interest at the lesser of 1.5% per month or the maximum rate permitted by law.

### 3. Delivery

3.1 Delivery on **{{deliveryDate}}** under: **{{deliveryTerms}}**.

3.2 Risk of loss and title pass to Buyer on delivery (UCC § 2-509), subject to clause 4.

### 4. Reservation of security interest

4.1 Until full payment is received, Seller reserves a purchase-money security interest in the Goods (UCC § 9-103). Buyer authorises Seller to file a UCC-1 financing statement in the appropriate state filing office.

### 5. Warranties

5.1 Seller expressly warrants that the Goods conform to the description in clause 1 + are free from material defects in materials and workmanship for a period of 12 months from delivery.

5.2 The implied warranty of merchantability (UCC § 2-314) and the implied warranty of fitness for a particular purpose (UCC § 2-315) **apply unless expressly disclaimed**. **THE FOLLOWING DISCLAIMER IS EFFECTIVE ONLY IF THIS CONTRACT IS B2B AND IS IN BOLD CONSPICUOUS TYPE PER UCC § 2-316:**

5.3 **TO THE MAXIMUM EXTENT PERMITTED BY LAW, SELLER DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, BEYOND THE EXPRESS WARRANTY IN CLAUSE 5.1.**

5.4 For consumer transactions covered by the Magnuson-Moss Warranty Act, this contract does not disclaim implied warranties on consumer goods sold with a written warranty (15 U.S.C. § 2308).

### 6. Limitation of liability

6.1 SELLER'S TOTAL LIABILITY UNDER THIS CONTRACT SHALL NOT EXCEED THE PURCHASE PRICE PAID FOR THE GOODS.

6.2 IN NO EVENT SHALL SELLER BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR LOST BUSINESS.

6.3 Nothing in this clause limits liability for personal injury, fraud, or matters that cannot be limited by law.

### 7. CISG opt-out

7.1 The United Nations Convention on Contracts for the International Sale of Goods (CISG) does not apply to this contract. The parties expressly opt out of CISG application.

### 8. Force majeure

8.1 Neither party is liable for delay or failure to perform caused by an event beyond reasonable control.

### 9. Governing law

9.1 This contract is governed by the laws of the State of Delaware (or the state in which Seller is domiciled), without regard to its conflict-of-laws principles.

9.2 The parties consent to the exclusive jurisdiction of the state and federal courts located in the seller's state.

### 10. Severability

10.1 If any provision is held unenforceable, the remaining provisions remain in full effect.

### 11. Entire agreement

11.1 This contract is the entire agreement between the parties + supersedes all prior negotiations + agreements on the subject matter.

---

**Signed by Seller:**

Signature: ____________________________

Name + Title:

**Signed by Buyer:**

Signature: ____________________________

Name + Title:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
