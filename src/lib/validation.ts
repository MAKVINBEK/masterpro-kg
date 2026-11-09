import { serviceCategories } from "@/data/services";

export const LIMITS = { nameMin: 2, nameMax: 60, messageMax: 1000 } as const;

export const serviceOptions: { value: string; label: string }[] = [
  ...serviceCategories.map((s) => ({ value: s.id as string, label: s.title as string })),
  { value: "other", label: "Другое / не знаю, что нужно" },
];

export type FieldName = "name" | "phone" | "service" | "message" | "consent";
export type FieldErrors = Partial<Record<FieldName, string>>;

export interface CleanLead {
  name: string;
  phone: string;
  service: string;
  message: string;
}

export type LeadValidation =
  | { ok: true; data: CleanLead }
  | { ok: false; errors: FieldErrors };

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.\-]*$/u;
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Приводит номер к виду +996XXXXXXXXX (или +международный). Возвращает null, если номер некорректен. */
export function normalizePhone(input: string): string | null {
  const trimmed = input.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("996") && digits.length === 12) return `+${digits}`;
  if (digits.length === 10 && digits.startsWith("0")) return `+996${digits.slice(1)}`;
  if (digits.length === 9 && !hasPlus) return `+996${digits}`;
  if (hasPlus && digits.length >= 10 && digits.length <= 15) return `+${digits}`;
  return null;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

export function validateLead(raw: Record<string, unknown>): LeadValidation {
  const errors: FieldErrors = {};

  const name = str(raw.name).replace(/\s+/g, " ").trim();
  if (name.length < LIMITS.nameMin) {
    errors.name = "Введите имя";
  } else if (name.length > LIMITS.nameMax || !NAME_RE.test(name)) {
    errors.name = "Проверьте имя: допустимы только буквы";
  }

  const phone = normalizePhone(str(raw.phone));
  if (!phone) {
    errors.phone = "Введите номер телефона, например +996 700 123 456";
  }

  const service = str(raw.service);
  if (!serviceOptions.some((o) => o.value === service)) {
    errors.service = "Выберите услугу";
  }

  const message = str(raw.message).replace(CONTROL_RE, "").trim();
  if (message.length > LIMITS.messageMax) {
    errors.message = `Не больше ${LIMITS.messageMax} символов`;
  }

  if (raw.consent !== true) {
    errors.consent = "Нужно согласие на обработку персональных данных";
  }

  if (Object.keys(errors).length > 0 || !phone) {
    return { ok: false, errors };
  }
  return { ok: true, data: { name, phone, service, message } };
}

export const REVIEW_LIMITS = { textMin: 10, textMax: 800 } as const;

export type ReviewFieldName = "name" | "rating" | "text" | "consent";
export type ReviewFieldErrors = Partial<Record<ReviewFieldName, string>>;

export interface CleanReview {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export type ReviewValidation =
  | { ok: true; data: CleanReview }
  | { ok: false; errors: ReviewFieldErrors };

const LINK_RE = /https?:\/\/|www\./i;

export function validateReview(raw: Record<string, unknown>): ReviewValidation {
  const errors: ReviewFieldErrors = {};

  const name = str(raw.name).replace(/\s+/g, " ").trim();
  if (name.length < LIMITS.nameMin) {
    errors.name = "Введите имя";
  } else if (name.length > LIMITS.nameMax || !NAME_RE.test(name)) {
    errors.name = "Проверьте имя: допустимы только буквы";
  }

  const rating = raw.rating;
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Поставьте оценку от 1 до 5";
  }

  const text = str(raw.text).replace(CONTROL_RE, "").replace(/\s+/g, " ").trim();
  if (text.length < REVIEW_LIMITS.textMin) {
    errors.text = `Напишите хотя бы ${REVIEW_LIMITS.textMin} символов`;
  } else if (text.length > REVIEW_LIMITS.textMax) {
    errors.text = `Не больше ${REVIEW_LIMITS.textMax} символов`;
  } else if (LINK_RE.test(text)) {
    errors.text = "Ссылки в отзывах не допускаются";
  }

  if (raw.consent !== true) {
    errors.consent = "Нужно согласие на обработку и публикацию отзыва";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    data: { name, rating: rating as 1 | 2 | 3 | 4 | 5, text },
  };
}