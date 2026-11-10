"use client";

import { CheckCircle2, Loader2, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";
import { normalizePath, pageSources } from "@/data/sources";
import {
  LIMITS,
  serviceOptions,
  validateLead,
  type FieldErrors,
  type FieldName,
} from "@/lib/validation";
import { Field, inputClass } from "./fields";
import { reachGoal } from "@/lib/analytics";

type Status = "idle" | "sending" | "success" | "error";

interface Values {
  name: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
  website: string; // ловушка для ботов
}

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "Слишком много попыток. Подождите несколько минут или позвоните нам.",
  too_fast: "Пожалуйста, проверьте данные и отправьте форму ещё раз.",
  busy: "Заявка уже отправляется. Подождите несколько секунд.",
};
const DEFAULT_ERROR = "Не удалось отправить заявку. Позвоните нам или напишите в WhatsApp.";

const FIELD_ORDER: FieldName[] = ["name", "phone", "service", "message", "consent"];

function makeInitial(pathname: string): Values {
  return {
    name: "",
    phone: "",
    service: pageSources[pathname]?.service ?? "",
    message: "",
    consent: false,
    website: "",
  };
}

export function LeadForm() {
  const uid = useId();
  const pathname = normalizePath(usePathname());
  const [values, setValues] = useState<Values>(() => makeInitial(pathname));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState(DEFAULT_ERROR);
  const startedAt = useRef<number | null>(null);
  const submissionId = useRef<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const fid = (field: string) => `${uid}-${field}`;

  function setField<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function showErrors(found: FieldErrors) {
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) document.getElementById(fid(first))?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const result = validateLead({ ...values });
    if (!result.ok) {
      showErrors(result.errors);
      return;
    }

    setErrors({});
    setStatus("sending");
    submissionId.current ??= crypto.randomUUID();

    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          path: pathname,
          submissionId: submissionId.current,
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      } | null;

      if (res.ok && data?.ok) {
        setValues(makeInitial(pathname));
        submissionId.current = null;
        setStatus("success");
        reachGoal("lead_sent");
        return;
      }

      if (data?.error === "validation" && data.fields) {
        setStatus("idle");
        showErrors(data.fields);
        return;
      }

      setErrorText(ERROR_TEXT[data?.error ?? ""] ?? DEFAULT_ERROR);
      setStatus("error");
    } catch {
      setErrorText(DEFAULT_ERROR);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white p-6 text-ink shadow-lg sm:p-8">
        <CheckCircle2 size={40} className="text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold">Заявка отправлена</h3>
        <p className="mt-2 leading-relaxed text-muted">
          Мы получили вашу заявку и свяжемся с вами по указанному номеру. Если вопрос
          срочный, позвоните:{" "}
          <a href={phoneHref} className="font-bold text-primary">
            {siteConfig.phone.display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-bold text-primary underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Заявка на вызов мастера"
      className="relative space-y-4 rounded-2xl bg-white p-5 text-ink shadow-lg sm:p-6"
    >
      <Field id={fid("name")} label="Ваше имя" error={errors.name}>
        <input
          id={fid("name")}
          type="text"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          maxLength={LIMITS.nameMax}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fid("name")}-error` : undefined}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>

      <Field id={fid("phone")} label="Номер телефона" error={errors.phone}>
        <input
          id={fid("phone")}
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+996 XXX XXX XXX"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
          maxLength={25}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${fid("phone")}-error` : undefined}
          className={inputClass(Boolean(errors.phone))}
        />
      </Field>

      <Field id={fid("service")} label="Что нужно сделать" error={errors.service}>
        <select
          id={fid("service")}
          name="service"
          value={values.service}
          onChange={(e) => setField("service", e.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? `${fid("service")}-error` : undefined}
          className={inputClass(Boolean(errors.service))}
        >
          <option value="">Выберите услугу</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fid("message")}
        label="Опишите проблему (необязательно)"
        error={errors.message}
      >
        <textarea
          id={fid("message")}
          name="message"
          rows={3}
          maxLength={LIMITS.messageMax}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fid("message")}-error` : undefined}
          className={`${inputClass(Boolean(errors.message))} py-3`}
        />
      </Field>

      {/* Ловушка для ботов: скрыта от людей и скринридеров */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Сайт
          <input
            type="text"
            name="company-website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fid("consent")}
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => setField("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${fid("consent")}-error` : undefined}
            className="mt-0.5 size-5 shrink-0 accent-primary"
          />
          <label htmlFor={fid("consent")} className="text-sm leading-relaxed text-muted">
            Я согласен(а) на обработку персональных данных в соответствии с{" "}
            <Link
              href="/privacy/"
              target="_blank"
              className="font-semibold text-primary underline"
            >
              политикой конфиденциальности
            </Link>
          </label>
        </div>
        {errors.consent && (
          <p id={`${fid("consent")}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
          <p className="flex items-start gap-2 font-semibold text-red-800">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            {errorText}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a href={phoneHref} className={buttonClasses({ size: "md" })}>
              <Phone size={18} aria-hidden="true" />
              {siteConfig.phone.display}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "outline", size: "md" })}
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className={buttonClasses({
          size: "lg",
          className: "w-full disabled:cursor-not-allowed disabled:opacity-70",
        })}
      >
        {sending ? (
          <>
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          "Отправить заявку"
        )}
      </button>
    </form>
  );
}