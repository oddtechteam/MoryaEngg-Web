"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Paperclip, ArrowUpRight } from "lucide-react";
import { projectTypes } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

const initialValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof typeof initialValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    if (!values.projectType) next.projectType = "Select a requirement type.";
    if (!values.message.trim()) next.message = "Tell us a little about the project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(initialValues);
      setFileName(null);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border-b border-on-navy-line bg-transparent py-3 text-sm text-on-navy placeholder:text-on-navy-muted/60 outline-none transition-colors focus:border-on-navy-blue";

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 border border-on-navy-line bg-white/[0.03] p-10 text-left">
        <CheckCircle2 size={40} className="text-gold" />
        <h3 className="font-display text-2xl text-on-navy">Enquiry sent.</h3>
        <p className="text-sm text-on-navy-muted">
          Thank you — our engineering team will get back to you shortly. For urgent requirements, reach us directly
          via phone or WhatsApp.
        </p>
        <button onClick={() => setStatus("idle")} className="link-underline text-xs tracking-wide text-on-navy-blue">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
            Full Name *
          </label>
          <input id="name" value={values.name} onChange={update("name")} className={inputClass} placeholder="Your name" aria-invalid={!!errors.name} />
          {errors.name && <span className="mt-1 block text-xs text-red-400">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
            Company Name
          </label>
          <input id="company" value={values.company} onChange={update("company")} className={inputClass} placeholder="Company (optional)" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
            Email *
          </label>
          <input id="email" type="email" value={values.email} onChange={update("email")} className={inputClass} placeholder="you@company.com" aria-invalid={!!errors.email} />
          {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
            Phone *
          </label>
          <input id="phone" type="tel" value={values.phone} onChange={update("phone")} className={inputClass} placeholder="+91" aria-invalid={!!errors.phone} />
          {errors.phone && <span className="mt-1 block text-xs text-red-400">{errors.phone}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
          Requirement / Project Type *
        </label>
        <select
          id="projectType"
          value={values.projectType}
          onChange={update("projectType")}
          className={`${inputClass} appearance-none`}
          aria-invalid={!!errors.projectType}
        >
          <option value="" className="bg-navy text-on-navy">Select a category</option>
          {projectTypes.map((t) => (
            <option key={t} value={t} className="bg-navy text-on-navy">
              {t}
            </option>
          ))}
        </select>
        {errors.projectType && <span className="mt-1 block text-xs text-red-400">{errors.projectType}</span>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
          Message *
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={update("message")}
          rows={4}
          className={inputClass}
          placeholder="Share your requirement, drawing reference or project details."
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="mt-1 block text-xs text-red-400">{errors.message}</span>}
      </div>

      <div>
        <label htmlFor="file" className="mb-1 block text-xs tracking-wide text-on-navy-muted">
          Upload Drawing / File
        </label>
        <label
          htmlFor="file"
          className="flex cursor-pointer items-center gap-2 border border-dashed border-on-navy-line px-4 py-3 text-xs text-on-navy-muted hover:border-on-navy-blue hover:text-on-navy-blue"
        >
          <Paperclip size={14} />
          {fileName || "Attach a drawing, PDF or image"}
        </label>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-400">
          <AlertCircle size={16} />
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="interactive"
        className="mt-2 inline-flex w-fit items-center gap-2 bg-gold px-8 py-4 text-sm font-medium text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Enquiry <ArrowUpRight size={14} />
          </>
        )}
      </button>
    </form>
  );
}
