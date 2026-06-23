"use client";

import { useState, useTransition } from "react";

function TrashIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 6 7 21 7" transform="translate(-0.5 0)" />
      <path d="M19 7l-.9 12.1a2 2 0 0 1-2 1.9H8a2 2 0 0 1-2-1.9L5 7" />
      <path d="M9.5 11v6M14.5 11v6" />
      <path d="M8.5 7V4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V7" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "delSpin 0.7s linear infinite" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
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

type DeleteFormProps = {
  action: () => Promise<void>;
  itemName?: string;
  itemLabel?: string; // e.g. "UMKM" or "Menu"
};

export default function DeleteForm({
  action,
  itemName,
  itemLabel = "data",
}: DeleteFormProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await action();
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="del-trigger-btn"
        aria-label={`Hapus ${itemLabel}`}
      >
        <style>{`
          .del-trigger-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 13px;
            border-radius: 9px;
            border: 1px solid var(--admin-border);
            background: var(--admin-surface);
            color: var(--admin-text-secondary);
            font-size: 13px;
            font-weight: 500;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
          }
          .del-trigger-btn:hover {
            background: var(--admin-danger-soft);
            border-color: rgba(248, 113, 113, 0.3);
            color: var(--admin-danger);
          }
          .del-trigger-btn svg {
            width: 14px;
            height: 14px;
          }
        `}</style>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 7l-.9 12.1a2 2 0 0 1-2 1.9H8a2 2 0 0 1-2-1.9L5 7" />
          <path d="M4 7h16M9.5 11v6M14.5 11v6M8.5 7V4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V7" />
        </svg>
        Hapus
      </button>

      {open && (
        <div
          className="del-modal-backdrop"
          onClick={() => !isPending && setOpen(false)}
        >
          <div className="del-modal-scene" onClick={(e) => e.stopPropagation()}>
            <div className="del-modal-card">
              <div className="del-modal-icon">
                <TrashIcon />
              </div>

              <h3 className="del-modal-title">
                Hapus {itemLabel}
                {itemName ? ` "${itemName}"` : ""}?
              </h3>
              <p className="del-modal-desc">
                Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara
                permanen dari sistem.
              </p>

              <div className="del-modal-actions">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="del-modal-btn del-modal-btn--cancel"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isPending}
                  className="del-modal-btn del-modal-btn--confirm"
                >
                  {isPending ? (
                    <>
                      <SpinnerIcon />
                      Menghapus...
                    </>
                  ) : (
                    "Ya, Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes delSpin {
              to { transform: rotate(360deg); }
            }

            .del-modal-backdrop {
              position: fixed;
              inset: 0;
              z-index: 100;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(8, 10, 16, 0.55);
              backdrop-filter: blur(4px);
              padding: 20px;
              animation: delBackdropIn 0.2s ease both;
            }
            @keyframes delBackdropIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .del-modal-scene {
              perspective: 900px;
              animation: delPopupIn 0.42s cubic-bezier(0.2, 1.2, 0.4, 1) both;
            }
            @keyframes delPopupIn {
              0% {
                opacity: 0;
                transform: rotateX(-28deg) translateY(28px) scale(0.9);
              }
              60% {
                opacity: 1;
                transform: rotateX(6deg) translateY(-3px) scale(1.015);
              }
              100% {
                opacity: 1;
                transform: rotateX(0deg) translateY(0) scale(1);
              }
            }

            .del-modal-card {
              width: min(340px, 90vw);
              border-radius: 18px;
              padding: 26px 24px 22px;
              text-align: center;
              background: var(--admin-bg-elevated);
              border: 1px solid var(--admin-border-strong);
              box-shadow: var(--admin-shadow-lg);
            }

            .del-modal-icon {
              width: 46px;
              height: 46px;
              margin: 0 auto 14px;
              border-radius: 13px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--admin-danger);
              background: var(--admin-danger-soft);
              animation: delIconPop 0.4s cubic-bezier(0.3, 1.4, 0.5, 1) 0.1s both;
            }
            @keyframes delIconPop {
              0% { transform: scale(0) rotate(-8deg); opacity: 0; }
              100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }

            .del-modal-title {
              font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
              font-weight: 700;
              font-size: 16px;
              color: var(--admin-text-primary);
              line-height: 1.4;
            }

            .del-modal-desc {
              margin-top: 8px;
              font-size: 13px;
              line-height: 1.6;
              color: var(--admin-text-secondary);
            }

            .del-modal-actions {
              display: flex;
              gap: 10px;
              margin-top: 20px;
            }

            .del-modal-btn {
              flex: 1;
              padding: 10px 14px;
              border-radius: 10px;
              font-size: 13.5px;
              font-weight: 600;
              font-family: inherit;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              transition: background 0.16s ease, border-color 0.16s ease, opacity 0.16s ease, transform 0.12s ease;
            }

            .del-modal-btn:active:not(:disabled) {
              transform: scale(0.97);
            }

            .del-modal-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            .del-modal-btn--cancel {
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              color: var(--admin-text-secondary);
            }
            .del-modal-btn--cancel:hover:not(:disabled) {
              background: var(--admin-surface-hover);
              color: var(--admin-text-primary);
            }

            .del-modal-btn--confirm {
              background: var(--admin-danger);
              border: 1px solid var(--admin-danger);
              color: #fff;
            }
            .del-modal-btn--confirm:hover:not(:disabled) {
              filter: brightness(1.08);
            }

            @media (prefers-reduced-motion: reduce) {
              .del-modal-scene, .del-modal-icon {
                animation: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
