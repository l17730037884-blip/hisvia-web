"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/locales";
import { pageT } from "@/lib/page-translations";
import { API_BASE_URL } from "@/lib/config";

interface RequestFormProps {
  locale: Locale;
  preset?: { brand?: string; category?: string; application?: string };
}

const BRAND_LABELS: Record<string, string> = {
  "atlas-copco": "Atlas Copco",
  kaeser: "Kaeser",
  "ingersoll-rand": "Ingersoll Rand",
  sullair: "Sullair",
  "gardner-denver": "Gardner Denver",
  hitachi: "Hitachi",
};

function translateBrand(slug: string): string {
  return BRAND_LABELS[slug] ?? slug;
}

export default function RequestForm({ locale, preset }: RequestFormProps) {
  const t = pageT[locale].form;

  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [equipmentBrand, setEquipmentBrand] = useState(
    preset?.brand ? translateBrand(preset.brand) : ""
  );
  const [equipmentModel, setEquipmentModel] = useState("");
  const [partNumbers, setPartNumbers] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const contextValue = [preset?.category, preset?.application]
    .filter(Boolean)
    .join(" / ");

  const inputClass =
    "w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-navy placeholder:text-steel/50 transition-colors duration-200 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/15";
  const labelClass = "block text-[12.5px] font-medium text-graphite mb-1.5";

  function buildMailto() {
    const fields: Array<[string, string]> = [
      [t.company, company],
      [t.contactName, contactName],
      [t.email, email],
      [t.equipmentBrand, equipmentBrand],
      [t.equipmentModel, equipmentModel],
      [t.partNumbers, partNumbers],
      [t.quantity, quantity],
      [t.message, message],
    ];
    if (contextValue) fields.push(["Context", contextValue]);
    const body = fields.map(([l, v]) => `${l}: ${v}`).join("\n");
    return `mailto:partner@hisvia.com?subject=${encodeURIComponent(`HISVIA — ${locale}`)}&body=${encodeURIComponent(body)}`;
  }

  function resetForm() {
    setCompany("");
    setContactName("");
    setEmail("");
    setEquipmentBrand(preset?.brand ? translateBrand(preset.brand) : "");
    setEquipmentModel("");
    setPartNumbers("");
    setQuantity("");
    setMessage("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      company,
      contactName,
      email,
      equipmentBrand,
      equipmentModel,
      partNumbers,
      quantity,
      message,
      locale,
      context: contextValue,
      preset: preset ?? {},
    };

    let fallback = false;
    try {
      const res = await fetch(`${API_BASE_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        fallback = true;
        window.location.href = buildMailto();
      }
    } catch {
      fallback = true;
      window.location.href = buildMailto();
    }

    setUsedFallback(fallback);
    setSuccess(true);
    resetForm();
    setSubmitting(false);
  }

  return (
    <div className="rounded border border-line bg-white p-8 card-elevated animate-fade-in-up">
      <h2 className="text-[22px] font-bold text-navy">{t.title}</h2>
      <p className="text-[14px] text-graphite mt-2 mb-6">{t.desc}</p>

      {success ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber">
            <svg
              className="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          {usedFallback && (
            <p className="mb-2 text-[12.5px] text-steel">{t.errorMsg}</p>
          )}
          <p className="text-[15px] font-medium text-navy">{t.successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="context" value={contextValue} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="rf-company">
                {t.company}
              </label>
              <input
                id="rf-company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
                placeholder="ACME Industrial"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="rf-contact">
                {t.contactName}
              </label>
              <input
                id="rf-contact"
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className={inputClass}
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="rf-email">
                {t.email}
              </label>
              <input
                id="rf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="rf-brand">
                {t.equipmentBrand}
              </label>
              <input
                id="rf-brand"
                type="text"
                value={equipmentBrand}
                onChange={(e) => setEquipmentBrand(e.target.value)}
                className={inputClass}
                placeholder="Atlas Copco"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="rf-model">
                {t.equipmentModel}
              </label>
              <input
                id="rf-model"
                type="text"
                value={equipmentModel}
                onChange={(e) => setEquipmentModel(e.target.value)}
                className={inputClass}
                placeholder="GA 75 VSD+"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="rf-parts">
                {t.partNumbers}
              </label>
              <input
                id="rf-parts"
                type="text"
                value={partNumbers}
                onChange={(e) => setPartNumbers(e.target.value)}
                className={inputClass}
                placeholder="1623051599, 1622314000"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="rf-qty">
                {t.quantity}
              </label>
              <input
                id="rf-qty"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={inputClass}
                placeholder="10"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass} htmlFor="rf-message">
              {t.message}
            </label>
            <textarea
              id="rf-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
              placeholder={t.message}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-sm border border-steel bg-steel px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-navy hover:border-navy btn-press disabled:opacity-60"
            >
              {submitting && (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {t.submitBtn}
            </button>
          </div>

          <p className="mt-3 text-[12px] text-steel">{t.attachmentsNote}</p>
          <p className="mt-1.5 text-[11.5px] text-steel/70">{t.privacyNote}</p>
        </form>
      )}
    </div>
  );
}
