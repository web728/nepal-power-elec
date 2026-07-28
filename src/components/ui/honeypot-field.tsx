import { HONEYPOT_FIELD } from "@/lib/honeypot";

export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
      <label htmlFor={HONEYPOT_FIELD}>Do not fill this field</label>
      <input
        type="text"
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
