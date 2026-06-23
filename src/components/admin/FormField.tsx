"use client";

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

type FieldWrapperProps = {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function FieldWrapper({ label, required, icon, children }: FieldWrapperProps) {
  return (
    <div className="admin-field">
      <style>{`
        .admin-field {
          width: 100%;
        }
        .admin-field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--admin-text-secondary);
          margin-bottom: 7px;
        }
        .admin-field-label svg {
          color: var(--admin-text-tertiary);
        }
      `}</style>
      <label className="admin-field-label">
        {icon}
        {label}{" "}
        {required && <span style={{ color: "var(--admin-danger)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
};

export function TextField({ label, icon, required, ...rest }: TextFieldProps) {
  return (
    <FieldWrapper label={label} required={required} icon={icon}>
      <style>{`
        .admin-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-primary);
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
        }
        .admin-input::placeholder {
          color: var(--admin-text-tertiary);
        }
        .admin-input:hover {
          border-color: var(--admin-border-strong);
        }
        .admin-input:focus {
          border-color: var(--admin-accent);
          background: var(--admin-accent-soft);
          box-shadow: 0 0 0 3px var(--admin-accent-soft);
        }
      `}</style>
      <input required={required} className="admin-input" {...rest} />
    </FieldWrapper>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  icon?: React.ReactNode;
};

export function TextAreaField({
  label,
  icon,
  required,
  rows = 4,
  ...rest
}: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} required={required} icon={icon}>
      <style>{`
        .admin-textarea {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-primary);
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          resize: vertical;
          line-height: 1.6;
          transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
        }
        .admin-textarea::placeholder {
          color: var(--admin-text-tertiary);
        }
        .admin-textarea:hover {
          border-color: var(--admin-border-strong);
        }
        .admin-textarea:focus {
          border-color: var(--admin-accent);
          background: var(--admin-accent-soft);
          box-shadow: 0 0 0 3px var(--admin-accent-soft);
        }
      `}</style>
      <textarea
        required={required}
        rows={rows}
        className="admin-textarea"
        {...rest}
      />
    </FieldWrapper>
  );
}

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label: string;
  icon?: React.ReactNode;
  options: SelectOption[];
  placeholder?: string;
};

export function SelectField({
  label,
  icon,
  required,
  options,
  placeholder = "Pilih salah satu",
  ...rest
}: SelectFieldProps) {
  return (
    <FieldWrapper label={label} required={required} icon={icon}>
      <style>{`
        .admin-select-wrap {
          position: relative;
        }
        .admin-select {
          width: 100%;
          appearance: none;
          padding: 11px 38px 11px 14px;
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: var(--admin-surface);
          color: var(--admin-text-primary);
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          cursor: pointer;
          transition: border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
        }
        .admin-select:hover {
          border-color: var(--admin-border-strong);
        }
        .admin-select:focus {
          border-color: var(--admin-accent);
          background: var(--admin-accent-soft);
          box-shadow: 0 0 0 3px var(--admin-accent-soft);
        }
        .admin-select option {
          background: var(--admin-bg-elevated);
          color: var(--admin-text-primary);
        }
        .admin-select-chevron {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--admin-text-tertiary);
          pointer-events: none;
        }
      `}</style>
      <div className="admin-select-wrap">
        <select required={required} className="admin-select" {...rest}>
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="admin-select-chevron"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </FieldWrapper>
  );
}
