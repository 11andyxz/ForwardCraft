import type { Partner } from "@/types";

/** Partner ecosystem — abstract mock companies (no real logos). */
export const partners: Partner[] = [
  { id: "cumulus", name: "Cumulus Cloud", logoId: "cumulus", category: "Cloud", blurb: "Co-engineered secure deployment on Cumulus infrastructure." },
  { id: "nimbus", name: "Nimbus Compute", logoId: "nimbus", category: "Cloud", blurb: "GPU capacity and private networking for training and inference." },
  { id: "lumen", name: "Lumen Models", logoId: "lumen", category: "Model", blurb: "Frontier model access with enterprise data controls." },
  { id: "synaptiq", name: "Synaptiq AI", logoId: "synaptiq", category: "Model", blurb: "Specialist models for vision and document understanding." },
  { id: "datastream", name: "DataStream", logoId: "datastream", category: "Data", blurb: "Governed data pipelines and warehouse connectors." },
  { id: "ledgerline", name: "Ledgerline", logoId: "ledgerline", category: "Data", blurb: "Financial data normalization and enrichment." },
  { id: "axiom-si", name: "Axiom Systems", logoId: "axiom", category: "Systems Integrator", blurb: "Joint delivery for large-scale enterprise rollouts." },
  { id: "northgate", name: "Northgate Consulting", logoId: "northgate", category: "Systems Integrator", blurb: "Change management and process transformation." },
  { id: "sentinel", name: "Sentinel Security", logoId: "sentinel", category: "Technology", blurb: "Identity, secrets, and zero-trust integration." },
  { id: "vault7", name: "Vault7", logoId: "vault7", category: "Technology", blurb: "Compliance tooling and audit log management." },
  { id: "pipeline", name: "Pipeline.io", logoId: "pipeline", category: "Technology", blurb: "Orchestration and observability for agent fleets." },
  { id: "cartograph", name: "Cartograph", logoId: "cartograph", category: "Data", blurb: "Knowledge graph and entity resolution." },
];
