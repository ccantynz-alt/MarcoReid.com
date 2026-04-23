// lib/aml/screening-stub.ts
//
// Screening stub for PEP / sanctions / adverse-media lookups.
//
// This module returns CLEAR for everything today. The shape of the
// response — `{ result, hits[] }` — is the contract a real screening
// data source will conform to when wired in. Production screening
// against PEP and sanctions lists requires a licensed list-data
// subscription and is out of scope for this stub.
//
// Wiring guidance for future implementers (kept deliberately abstract —
// no third-party data provider names are referenced anywhere in this
// repository): replace the body of each function with a HTTPS call to
// the chosen list-data source, normalize the response into the `Hit`
// shape below, and return the aggregated `ScreeningResult`. Persist the
// raw provider payload to object storage and store the key on
// `CddCheck.rawResultRef` for evidentiary audit.

import type { CddCheckResult } from "@prisma/client";

export interface Hit {
  listName: string; // e.g. "OFAC SDN", "UN Consolidated", "AU DFAT"
  matchScore: number; // 0..1
  source: string; // an opaque identifier of the data source used
}

export interface ScreeningResult {
  result: CddCheckResult;
  hits: Hit[];
}

const CLEAR: ScreeningResult = { result: "CLEAR", hits: [] };

export async function screenForPep(
  name: string,
  dob?: Date | null,
): Promise<ScreeningResult> {
  // Stub: real screening data source wires here later.
  void name;
  void dob;
  return CLEAR;
}

export async function screenForSanctions(
  name: string,
  country?: string | null,
): Promise<ScreeningResult> {
  // Stub: real screening data source wires here later.
  void name;
  void country;
  return CLEAR;
}

export async function screenForAdverseMedia(
  name: string,
): Promise<ScreeningResult> {
  // Stub: real screening data source wires here later.
  void name;
  return CLEAR;
}
