"use client";

import { useFormStatus } from "react-dom";

function SpinnerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "submitSpin 0.7s linear infinite" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SubmitButton({
  idleLabel,
  pendingLabel,
}: {
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="admin-submit-btn">
      <style>{`
        @keyframes submitSpin {
          to { transform: rotate(360deg); }
        }

        .admin-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 10px;
          border: 1px solid var(--admin-accent);
          background: var(--admin-accent);
          color: #fff;
          font-size: 13.5px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.16s ease, transform 0.12s ease, opacity 0.16s ease;
        }

        .admin-submit-btn:hover:not(:disabled) {
          background: var(--admin-accent-hover);
          border-color: var(--admin-accent-hover);
        }

        .admin-submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .admin-submit-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }
      `}</style>
      {pending ? (
        <>
          <SpinnerIcon />
          {pendingLabel}
        </>
      ) : (
        <>
          <CheckIcon />
          {idleLabel}
        </>
      )}
    </button>
  );
}
