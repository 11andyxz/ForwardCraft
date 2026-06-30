"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  solution: string;
  message: string;
  consent: boolean;
}

type StringField = Exclude<keyof FormState, "consent">;

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  jobTitle: "",
  companySize: "",
  industry: "",
  solution: "",
  message: "",
  consent: false,
};

const companySizeOptions = [
  { value: "1-50", label: "1–50" },
  { value: "51-200", label: "51–200" },
  { value: "201-1000", label: "201–1,000" },
  { value: "1001-5000", label: "1,001–5,000" },
  { value: "5000+", label: "5,000+" },
];

// Hardcoded inline to keep the form decoupled from the data layer.
const industryOptions = [
  "Asset management",
  "Banking",
  "Consumer",
  "Energy",
  "Healthcare",
  "Insurance",
  "Life sciences",
  "Private equity",
  "Public sector",
  "Sports",
].map((name) => ({ value: name, label: name }));

const solutionOptions = [
  "Back-office automation",
  "Computer vision",
  "Contact center",
  "Demand forecasting",
  "Custom solutions",
  "App modernization",
  "Investment analysis",
].map((name) => ({ value: name, label: name }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Book-a-demo / contact form. Simulated async submit (no backend): validates
 * client-side, resolves a Promise after a short delay, and surfaces
 * loading/success/error states. Emails ending in "@error.test" simulate a
 * server failure so the error path is demoable.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<string | null>(null);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setBanner(null);
    }
  }

  function validate(state: FormState): Partial<Record<keyof FormState, string>> {
    const next: Partial<Record<keyof FormState, string>> = {};
    const required: { key: StringField; label: string }[] = [
      { key: "firstName", label: "First name" },
      { key: "lastName", label: "Last name" },
      { key: "email", label: "Business email" },
      { key: "company", label: "Company" },
      { key: "jobTitle", label: "Job title" },
      { key: "companySize", label: "Company size" },
      { key: "industry", label: "Industry" },
      { key: "solution", label: "Interested solution" },
      { key: "message", label: "Message" },
    ];
    for (const { key, label } of required) {
      if (!state[key].trim()) next[key] = `${label} is required.`;
    }
    if (state.email.trim() && !EMAIL_RE.test(state.email.trim())) {
      next.email = "Enter a valid business email address.";
    }
    if (!state.consent) {
      next.consent = "Please confirm you agree to be contacted.";
    }
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBanner(null);
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    if (values.email.trim().toLowerCase().endsWith("@error.test")) {
      setStatus("error");
      setBanner("We couldn't submit your request. Please try again in a moment.");
      return;
    }
    setStatus("success");
  }

  function reset() {
    setValues(emptyForm);
    setErrors({});
    setStatus("idle");
    setBanner(null);
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-5 rounded-2xl border border-success/25 bg-success-soft p-8 shadow-md sm:p-10"
        role="status"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-paper text-success shadow-sm ring-1 ring-success/20">
          <Check className="size-6" strokeWidth={2.25} />
        </span>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl text-ink">Thanks — your request is in.</h3>
          <p className="text-sm leading-relaxed text-ink-muted">
            A member of our team will be in touch within one business day to schedule your demo.
            In the meantime, keep an eye on your inbox for a confirmation. This is a mock form, so
            no message was actually sent.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={reset}>
          Submit another request
        </Button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {banner ? (
        <div
          className="flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3.5 text-sm text-danger shadow-sm"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2.25} />
          <span>{banner}</span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="First name"
          name="firstName"
          required
          autoComplete="given-name"
          value={values.firstName}
          onChange={(e) => setField("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Last name"
          name="lastName"
          required
          autoComplete="family-name"
          value={values.lastName}
          onChange={(e) => setField("lastName", e.target.value)}
          error={errors.lastName}
        />
      </div>

      <Input
        label="Business email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        value={values.email}
        onChange={(e) => setField("email", e.target.value)}
        error={errors.email}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Company"
          name="company"
          required
          autoComplete="organization"
          value={values.company}
          onChange={(e) => setField("company", e.target.value)}
          error={errors.company}
        />
        <Input
          label="Job title"
          name="jobTitle"
          required
          autoComplete="organization-title"
          value={values.jobTitle}
          onChange={(e) => setField("jobTitle", e.target.value)}
          error={errors.jobTitle}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Company size"
          name="companySize"
          required
          placeholder="Select size…"
          options={companySizeOptions}
          value={values.companySize}
          onChange={(e) => setField("companySize", e.target.value)}
          error={errors.companySize}
        />
        <Select
          label="Industry"
          name="industry"
          required
          placeholder="Select industry…"
          options={industryOptions}
          value={values.industry}
          onChange={(e) => setField("industry", e.target.value)}
          error={errors.industry}
        />
      </div>

      <Select
        label="Interested solution"
        name="solution"
        required
        placeholder="Select a solution…"
        options={solutionOptions}
        value={values.solution}
        onChange={(e) => setField("solution", e.target.value)}
        error={errors.solution}
      />

      <Textarea
        label="Message"
        name="message"
        required
        rows={4}
        placeholder="Tell us about the workflow you'd like to automate."
        value={values.message}
        onChange={(e) => setField("message", e.target.value)}
        error={errors.message}
      />

      <Checkbox
        label={
          <>
            I agree to be contacted by {""}
            <span className="font-medium text-ink">ForwardCraft</span> about my request and consent
            to my information being processed for this purpose.
          </>
        }
        name="consent"
        checked={values.consent}
        onChange={(e) => setField("consent", e.target.checked)}
        error={errors.consent}
      />

      <div className="flex flex-col gap-3 border-t border-line pt-5">
        <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            "Request a demo"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-ink-subtle">
          This is a demonstration form — submissions are simulated and no data leaves your browser.
        </p>
      </div>
    </form>
  );
}
