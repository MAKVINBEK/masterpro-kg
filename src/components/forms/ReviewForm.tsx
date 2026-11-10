"use client";

import { CheckCircle2, Loader2, Star, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  LIMITS,
  REVIEW_LIMITS,
  validateReview,
  type ReviewFieldErrors,
  type ReviewFieldName,
} from "@/lib/validation";
import { Field, inputClass } from "./fields";
import { reachGoal } from "@/lib/analytics";

type Status = "idle" | "sending" | "success" | "error";

interface Values {
  name: string;
  rating: number;
  text: string;
  consent: boolean;
  website: string; // ловушка для ботов
}

const INITIAL: Values = { name: "", rating: 0, text: "", consent: false, website: "" };

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "Вы уже отправляли отзывы недавно. Попробуйте позже.",
  too_fast: "Пожалуйста, проверьте данные и отправьте отзыв ещё раз.",
  busy: "Отзыв уже отправляется. Подождите несколько секунд.",
};
const DEFAULT_ERROR = "Не удалось отправить отзыв. Попробуйте ещё раз чуть позже.";

const FIELD_ORDER: ReviewFieldName[] = ["name", "rating", "text", "consent"];

export function ReviewForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<ReviewFieldErrors>({});
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

  function showErrors(found: ReviewFieldErrors) {
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) document.getElementById(fid(first))?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const result = validateReview({ ...values });
    if (!result.ok) {
      showErrors(result.errors);
      return;
    }

    setErrors({});
    setStatus("sending");
    submissionId.current ??= crypto.randomUUID();

    try {
      const res = await fetch("/api/review/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          submissionId: submissionId.current,
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fields?: ReviewFieldErrors;
      } | null;

      if (res.ok && data?.ok) {
        setValues(INITIAL);
        submissionId.current = null;
        setStatus("success");
        reachGoal("review_sent");
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
      <div role="status" className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <CheckCircle2 size={40} className="text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold">Спасибо за отзыв!</h3>
        <p className="mt-2 leading-relaxed text-muted">
          Мы получили ваш отзыв. Он появится на сайте после проверки.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Отзыв о работе мастера"
      className="relative space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-6"
    >
      <Field id={fid("name")} label="Ваше имя" error={errors.name}>
        <input
          id={fid("name")}
          type="text"
          name="name"
          autoComplete="given-name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          maxLength={LIMITS.nameMax}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fid("name")}-error` : undefined}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>

      <fieldset>
        <legend className="mb-1 text-sm font-semibold text-primary">Ваша оценка</legend>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="relative cursor-pointer rounded-lg p-1.5">
              <input
                id={n === 1 ? fid("rating") : undefined}
                type="radio"
                name="rating"
                value={n}
                checked={values.rating === n}
                onChange={() => setField("rating", n)}
                aria-label={`${n} из 5`}
                className="peer sr-only"
              />
              <Star
                size={32}
                aria-hidden="true"
                className={cn(
                  "transition-colors",
                  n <= values.rating ? "fill-accent text-primary" : "text-primary/30",
                )}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg peer-focus-visible:outline-2 peer-focus-visible:outline-primary"
              />
            </label>
          ))}
          {values.rating > 0 && (
            <span className="ml-2 text-sm font-semibold text-primary">
              {values.rating} из 5
            </span>
          )}
        </div>
        {errors.rating && (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.rating}
          </p>
        )}
      </fieldset>

      <Field id={fid("text")} label="Текст отзыва" error={errors.text}>
        <textarea
          id={fid("text")}
          name="text"
          rows={5}
          maxLength={REVIEW_LIMITS.textMax}
          value={values.text}
          onChange={(e) => setField("text", e.target.value)}
          aria-invalid={Boolean(errors.text)}
          aria-describedby={errors.text ? `${fid("text")}-error` : undefined}
          className={`${inputClass(Boolean(errors.text))} py-3`}
        />
        <p className="mt-1 text-right text-xs text-muted">
          {values.text.length} / {REVIEW_LIMITS.textMax}
        </p>
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
            className="mt-0.5 size-5 shrink-0 accent-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          />
          <label htmlFor={fid("consent")} className="text-sm leading-relaxed text-muted">
            Я согласен(а) на обработку персональных данных и на публикацию моего отзыва
            (имя, оценка и текст) на сайте в соответствии с{" "}
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
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800"
        >
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {errorText}
        </p>
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
          "Отправить отзыв"
        )}
      </button>
    </form>
  );
}