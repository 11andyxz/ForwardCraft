import type { Office } from "@/types";

/** Global office presence — mock locations. */
export const offices: Office[] = [
  { id: "nyc", city: "New York", country: "United States", region: "Americas", type: "HQ", timezone: "ET" },
  { id: "sf", city: "San Francisco", country: "United States", region: "Americas", type: "Office", timezone: "PT" },
  { id: "toronto", city: "Toronto", country: "Canada", region: "Americas", type: "Office", timezone: "ET" },
  { id: "saopaulo", city: "São Paulo", country: "Brazil", region: "Americas", type: "Hub", timezone: "BRT" },
  { id: "london", city: "London", country: "United Kingdom", region: "EMEA", type: "Office", timezone: "GMT" },
  { id: "berlin", city: "Berlin", country: "Germany", region: "EMEA", type: "Office", timezone: "CET" },
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", region: "EMEA", type: "Hub", timezone: "GST" },
  { id: "singapore", city: "Singapore", country: "Singapore", region: "APAC", type: "Office", timezone: "SGT" },
  { id: "bangalore", city: "Bangalore", country: "India", region: "APAC", type: "Hub", timezone: "IST" },
  { id: "sydney", city: "Sydney", country: "Australia", region: "APAC", type: "Office", timezone: "AET" },
];
