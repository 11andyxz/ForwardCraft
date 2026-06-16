"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  company: string;
  contact: string;
  email: string;
  type: string;
  message: string;
  consent: boolean;
}

interface Errors {
  company?: string;
  contact?: string;
  email?: string;
  type?: string;
  message?: string;
  consent?: string;
}

const partnershipTypes = [
  { value: "Cloud", label: "Cloud" },
  { value: "Model", label: "Model" },
  { value: "Data", label: "Data" },
  { value: "Systems Integrator", label: "Systems Integrator" },
  { value: "Technology", label: "Technology" },
];

const initial: FormState = {
  company: "",
  contact: "",
  email: "",
  type: "",
  message: "",
  consent: false,
};

/**
 * Partnership inquiry form with simulated async submit. No backend — validates
 * client-side, resolves a Promise after a short delay, and surfaces
 * success/error states. Emails ending in "@error.test" force the error path.
 */
export function PartnershipForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setBanner(null);
    }
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.company.trim()) next.company = "Company name is required.";
    if (!values.contact.trim()) next.contact = "Contact name is required.";
    if (!values.email.trim()) next.email = "Business email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid business email address.";
    if (!values.type) next.type = "Select a partnership type.";
    if (!values.message.trim()) next.message = "Tell us a little about your goals.";
    if (!values.consent) next.consent = "Please agree before submitting.";
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBanner(null);
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    if (values.email.endsWith("@error.test")) {
      setStatus("error");
      setBanner("We couldn't submit your inquiry. Please try again in a moment.");
      return;
    }
    setStatus("success");
  }

  function reset() {
    setValues(initial);
    setErrors({});
    setBanner(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-lg border border-success/30 bg-success-soft p-8"
        role="status"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-paper text-success ring-1 ring-success/30">
          <Check className="size-5" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-medium text-ink">Inquiry received</h3>
          <p className="max-w-md text-sm text-ink-muted">
            Thanks{values.contact ? `, ${values.contact.split(" ")[0]}` : ""} — our partnerships
            team will review your interest in a {values.type || "partner"} relationship and reply
            within two business days.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          Submit another inquiry <ArrowRight className="size-4" />
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {banner ? (
        <div
          className="rounded-md border border-danger bg-danger-soft px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {banner}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Company name"
          name="company"
          required
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          error={errors.company}
          placeholder="Acme Corp"
          disabled={loading}
        />
        <Input
          label="Contact name"
          name="contact"
          required
          value={values.contact}
          onChange={(e) => update("contact", e.target.value)}
          error={errors.contact}
          placeholder="Jordan Rivera"
          disabled={loading}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Business email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          placeholder="you@company.com"
          disabled={loading}
        />
        <Select
          label="Partnership type"
          name="type"
          required
          options={partnershipTypes}
          placeholder="Select a type"
          value={values.type}
          onChange={(e) => update("type", e.target.value)}
          error={errors.type}
          disabled={loading}
        />
      </div>

      <Textarea
        label="How would we work together?"
        name="message"
        required
        rows={5}
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
        placeholder="Tell us about your platform, customers, and the outcomes you want to build together."
        disabled={loading}
      />

      <Checkbox
        name="consent"
        checked={values.consent}
        onChange={(e) => update("consent", e.target.checked)}
        error={errors.consent}
        disabled={loading}
        label={
          <>
            I agree to be contacted by ForwardCraft about this partnership inquiry and have read the
            privacy notice.
          </>
        }
      />

      <div className="flex items-center gap-4 pt-1">
        <Button type="submit" disabled={loading} withArrow={!loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Submit inquiry"
          )}
        </Button>
        <p className="text-xs text-ink-subtle">We reply within two business days.</p>
      </div>
    </form>
  );
}
