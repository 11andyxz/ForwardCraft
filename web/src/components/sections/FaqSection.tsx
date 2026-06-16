import type { Faq } from "@/types";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

interface FaqSectionProps {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "paper" | "surface";
}

/** FAQ accordion section with FAQPage structured data. */
export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Common questions",
  intro,
  tone = "paper",
}: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Section tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <Accordion
          items={faqs.map((f) => ({ id: f.id, trigger: f.question, content: f.answer }))}
          defaultOpen={faqs[0]?.id}
        />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Section>
  );
}
