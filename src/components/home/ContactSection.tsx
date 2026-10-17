"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  BadgeIndianRupee,
  ChevronDown,
  Calendar,
} from "lucide-react";

const PACKAGES = [
  "Quick Shoot",
  "Half Day",
  "Full Day",
  "Brand Starter",
  "Brand Pro",
  "Monthly Retainer",
  "Wedding Basic",
  "Wedding Silver",
  "Wedding Gold",
  "Wedding Platinum",
];

const STATES = [
  "Telangana",
  "Maharashtra",
  "Karnataka",
  "Delhi NCR",
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Other",
];

const CITIES: Record<string, string[]> = {
  Telangana: ["Hyderabad", "Warangal", "Other"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Other"],
  Karnataka: ["Bangalore", "Mysore", "Other"],
  "Delhi NCR": ["New Delhi", "Gurgaon", "Noida", "Other"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Other"],
  "West Bengal": ["Kolkata", "Other"],
  Gujarat: ["Ahmedabad", "Surat", "Other"],
  Rajasthan: ["Jaipur", "Udaipur", "Other"],
  Other: ["Other"],
};

const TIMES = [
  "Morning (8 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
  "Night (8 PM – 12 AM)",
];

const fieldClass =
  "w-full rounded-lg border border-platinum/15 bg-[#0a0a0a] px-4 py-3 font-sans text-sm text-platinum placeholder:text-silver/50 outline-none transition-colors focus:border-platinum/45 [color-scheme:dark] autofill:shadow-[inset_0_0_0_1000px_#0a0a0a] autofill:[-webkit-text-fill-color:#e6e6e6]";

const labelClass =
  "mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-silver";

function DarkSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`${fieldClass} flex items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-40 ${
          !value ? "text-silver/50" : ""
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-silver transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-30 mt-1.5 max-h-56 overflow-auto rounded-lg border border-platinum/20 bg-[#141414] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left font-sans text-sm transition-colors ${
                    value === opt
                      ? "bg-platinum/15 text-platinum"
                      : "text-platinum/85 hover:bg-platinum/10 hover:text-platinum"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function DateField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const pickerRef = useRef<HTMLInputElement>(null);

  /** Display as dd/mm/yyyy; store as yyyy-mm-dd when valid */
  const toDisplay = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    if (!y || !m || !d) return iso;
    return `${d}/${m}/${y}`;
  };

  const parseManual = (raw: string): string | null => {
    const cleaned = raw.trim().replace(/[-.]/g, "/");
    const m = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return null;
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const dt = new Date(year, month - 1, day);
    if (
      dt.getFullYear() !== year ||
      dt.getMonth() !== month - 1 ||
      dt.getDate() !== day
    ) {
      return null;
    }
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const [text, setText] = useState(toDisplay(value));

  useEffect(() => {
    setText(toDisplay(value));
  }, [value]);

  const openPicker = () => {
    const el = pickerRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.click();
  };

  return (
    <div>
      <label className={labelClass} htmlFor="date">
        Date of Event
      </label>
      <div className="relative">
        <input type="hidden" name="date" value={value} required />
        <input
          id="date"
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/yyyy"
          value={text}
          onChange={(e) => {
            const raw = e.target.value;
            setText(raw);
            const iso = parseManual(raw);
            if (iso) onChange(iso);
            else if (!raw.trim()) onChange("");
          }}
          onBlur={() => {
            const iso = parseManual(text);
            if (iso) {
              onChange(iso);
              setText(toDisplay(iso));
            } else if (value) {
              setText(toDisplay(value));
            }
          }}
          className={`${fieldClass} pr-12`}
        />
        <button
          type="button"
          onClick={openPicker}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-silver transition-colors hover:bg-platinum/10 hover:text-platinum"
          aria-label="Open calendar"
        >
          <Calendar className="h-4 w-4" />
        </button>
        <input
          ref={pickerRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      </div>
      <p className="mt-1.5 font-sans text-[10px] text-silver/70">
        Type dd/mm/yyyy or tap the calendar
      </p>
    </div>
  );
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pkg, setPkg] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const cities = state ? CITIES[state] ?? ["Other"] : [];

  const resetForm = () => {
    formRef.current?.reset();
    setPkg("");
    setCountry("India");
    setState("");
    setCity("");
    setTime("");
    setDate("");
    setVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!verified || submitting) return;
    if (!pkg || !state || !city || !time || !date) return;

    const fd = new FormData(e.currentTarget);
    const get = (key: string) => String(fd.get(key) ?? "").trim();
    setSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: get("fullName"),
          phone: get("phone"),
          email: get("email"),
          packageName: pkg,
          details: get("details"),
          address: get("address"),
          city,
          state,
          country,
          preferredDate: date,
          preferredTime: time,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        whatsappUrl?: string;
      };
      if (!res.ok) {
        setFormError(data.error || "Could not send enquiry.");
        return;
      }
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
      resetForm();
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 5000);
    } catch {
      setFormError("Could not send enquiry. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-noir py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-platinum/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[560px] px-4 sm:px-6">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            Book Your Session
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium text-platinum md:text-5xl">
            Lock in your shoot.
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-silver md:text-base">
            Share your date, city, and where it&apos;s happening — we&apos;ll
            confirm your Reel-Maker and lock the slot.
          </p>
        </motion.div>

        <AnimatePresence>
          {success && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-5 flex items-center gap-3 rounded-xl border border-platinum/25 bg-platinum/10 px-4 py-3"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-platinum" />
              <p className="font-sans text-sm text-platinum">
                Message sent successfully
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-platinum/12 bg-[#111111] p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div>
            <label className={labelClass} htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Contact Number
            </label>
            <div className="flex overflow-hidden rounded-lg border border-platinum/15 focus-within:border-platinum/45">
              <div className="flex shrink-0 items-center gap-2 border-r border-platinum/15 bg-[#0a0a0a] px-3 font-sans text-sm text-platinum">
                <span aria-hidden>🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile"
                pattern="[0-9]{10}"
                className="w-full bg-[#0a0a0a] px-4 py-3 font-sans text-sm text-platinum placeholder:text-silver/50 outline-none [color-scheme:dark] autofill:shadow-[inset_0_0_0_1000px_#0a0a0a] autofill:[-webkit-text-fill-color:#e6e6e6]"
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className={fieldClass}
            />
          </div>

          <DarkSelect
            id="package"
            name="package"
            label="Package Type"
            value={pkg}
            onChange={setPkg}
            options={PACKAGES}
            placeholder="Select a package"
            required
          />

          <div>
            <label className={labelClass} htmlFor="details">
              Event Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              required
              placeholder="Tell us about your shoot"
              className={`${fieldClass} resize-none`}
            />
          </div>

          <DarkSelect
            id="country"
            name="country"
            label="Country"
            value={country}
            onChange={setCountry}
            options={["India"]}
            placeholder="Select country"
            required
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DarkSelect
              id="state"
              name="state"
              label="State / Region"
              value={state}
              onChange={(v) => {
                setState(v);
                setCity("");
              }}
              options={STATES}
              placeholder="Select state"
              required
            />
            <DarkSelect
              id="city"
              name="city"
              label="City"
              value={city}
              onChange={setCity}
              options={cities}
              placeholder="Select city"
              required
              disabled={!state}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="address">
              Address / Venue
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="e.g., Jubilee Hills"
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DateField value={date} onChange={setDate} />
            <DarkSelect
              id="time"
              name="time"
              label="Preferred Time"
              value={time}
              onChange={setTime}
              options={TIMES}
              placeholder="Select preferred time"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setVerified((v) => !v)}
            className="flex w-full items-center gap-3 rounded-lg border border-platinum/15 bg-[#1a1a1a] px-4 py-3 text-left transition-colors hover:border-platinum/30"
            aria-pressed={verified}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded border ${
                verified
                  ? "border-platinum bg-platinum text-noir"
                  : "border-platinum/40 bg-noir"
              }`}
            >
              {verified ? (
                <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
              ) : null}
            </span>
            <span className="font-sans text-sm text-platinum/80">
              I&apos;m not a robot
            </span>
          </button>

          {formError && (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={!verified || submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-platinum py-3.5 font-sans text-sm font-semibold text-noir transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Sending…" : "Submit Enquiry"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-1">
            {[
              { icon: CheckCircle2, label: "24/7 Support" },
              { icon: Shield, label: "Secure & Safe" },
              { icon: BadgeIndianRupee, label: "Best Price" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 font-sans text-[11px] text-silver"
              >
                <Icon className="h-3.5 w-3.5 text-platinum/70" />
                {label}
              </span>
            ))}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
