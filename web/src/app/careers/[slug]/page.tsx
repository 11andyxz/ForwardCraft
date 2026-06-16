import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, Building2, Check, MapPin, Users } from "lucide-react";
import type { Job } from "@/types";
import { pageMetadata } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { JobCard } from "@/components/cards/JobCard";
import { CTASection } from "@/components/sections/CTASection";
import { jobs, getJob } from "@/data/mock/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return pageMetadata({ title: "Careers" });
  return pageMetadata({
    title: job.title,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

function ListBlock({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl">{heading}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink-muted">
            <Check className="mt-1 size-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  // A few other roles to surface at the bottom, preferring the same department.
  const moreRoles = [
    ...jobs.filter((j) => j.slug !== job.slug && j.department === job.department),
    ...jobs.filter((j) => j.slug !== job.slug && j.department !== job.department),
  ].slice(0, 3);

  const details: { label: string; value: string; icon: typeof MapPin }[] = [
    { label: "Location", value: job.location, icon: MapPin },
    { label: "Employment type", value: job.type, icon: Briefcase },
    { label: "Department", value: job.department, icon: Building2 },
    { label: "Posted", value: formatDate(job.postedAt), icon: Users },
  ];

  return (
    <>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        description={job.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${job.slug}` },
        ]}
        actions={
          <>
            <Button href="/contact" withArrow>
              Apply now
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="outline">{job.type}</Badge>
              <Badge tone="neutral">{job.location}</Badge>
              {job.remote ? <Badge tone="accent">Remote</Badge> : null}
            </div>
          </>
        }
      />

      <Section tone="paper" ariaLabel="Role details">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Main content */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl">
                About the role
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-muted">
                <p>{job.summary}</p>
                <p>
                  As a {job.title} on our {job.department} team, you&apos;ll work alongside
                  engineers, researchers, and domain experts to take AI from prototype to
                  production inside regulated, high-stakes operations. You&apos;ll own outcomes end
                  to end — scoping the problem, shipping a governed system, and instrumenting it so
                  impact is measurable against a real baseline.
                </p>
                <p>
                  This is a hands-on, high-ownership role for someone who wants their work to reach
                  real users. You&apos;ll help raise the quality bar through evaluation, review, and
                  clear written communication.
                </p>
              </div>
            </div>

            <Reveal>
              <ListBlock heading="What you'll do" items={job.responsibilities} />
            </Reveal>
            <Reveal>
              <ListBlock heading="What we're looking for" items={job.requirements} />
            </Reveal>
            <Reveal>
              <ListBlock heading="Nice to have" items={job.niceToHave} />
            </Reveal>
          </div>

          {/* Sticky aside */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="neutral">{job.department}</Badge>
                {job.remote ? <Badge tone="accent">Remote</Badge> : null}
              </div>
              <h2 className="text-lg font-medium text-ink">{job.title}</h2>

              <dl className="flex flex-col gap-3">
                {details.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={detail.label}
                      className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="flex items-center gap-2 text-sm text-ink-subtle">
                        <Icon className="size-4" />
                        {detail.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-ink">{detail.value}</dd>
                    </div>
                  );
                })}
              </dl>

              <Button href="/contact" className="w-full" withArrow>
                Apply now
              </Button>

              <p className="rounded-md bg-paper px-3 py-2.5 text-xs leading-relaxed text-ink-subtle">
                This is a sample listing on a demonstration site. The role and details are mock
                content — applying takes you to our contact form.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* More roles */}
      {moreRoles.length > 0 ? (
        <Section tone="surface" ariaLabel="More open roles">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Keep exploring" title="More open roles" />
            <Button href="/careers" variant="secondary" withArrow>
              View all roles
            </Button>
          </div>
          <ul className="flex flex-col gap-4">
            {moreRoles.map((role: Job) => (
              <li key={role.id}>
                <JobCard job={role} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CTASection
        eyebrow="Apply"
        title="Think you're a fit?"
        description="We'd love to hear from you. Reach out and tell us why this role is the one — even if your background doesn't tick every box."
        primary={{ label: "Apply now", href: "/contact" }}
        secondary={{ label: "All open roles", href: "/careers" }}
      />
    </>
  );
}
