import type { Testimonial } from "@/types";

/** Homepage / about rotating testimonials. All names and companies are mock. */
export const testimonials: Testimonial[] = [
  {
    id: "t-meridian",
    quote:
      "ForwardCraft didn't sell us a demo. They put agents into our research workflow, gated on evals we trust, and handed us the keys.",
    authorName: "Priya Nair",
    authorTitle: "Head of Research",
    company: "Meridian Capital",
    logoId: "meridian",
  },
  {
    id: "t-atlas",
    quote:
      "Onboarding used to take a week. It now takes an afternoon — and every step is auditable. That combination is what regulated banking needs.",
    authorName: "Daniel Okafor",
    authorTitle: "COO",
    company: "Atlas Bank",
    logoId: "atlas",
  },
  {
    id: "t-northwind",
    quote:
      "Their human-in-the-loop network is the difference. Claims that need judgment reach an expert in minutes, not days.",
    authorName: "Sofia Marchetti",
    authorTitle: "VP, Claims",
    company: "Northwind Insurance",
    logoId: "northwind",
  },
  {
    id: "t-harborline",
    quote:
      "Forecasting accuracy jumped in the first quarter. The team trusts the numbers now, which changed how we plan.",
    authorName: "Marcus Lindqvist",
    authorTitle: "SVP Operations",
    company: "Harborline Logistics",
    logoId: "harborline",
  },
];
