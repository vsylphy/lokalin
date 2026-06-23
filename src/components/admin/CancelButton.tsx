"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AlertTriangleIcon() {
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
      <path d="M12 3.2 21.3 19.5H2.7L12 3.2Z" />
      <line x1="12" y1="9.5" x2="12" y2="13.5" />
      <circle cx="12" cy="16.3" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

type CancelButtonProps = {
  /** Whether the form currently has unsaved changes */
  isDirty: boolean;
  /** Where to navigate when confirmed / when no changes exist */
  href: string;
  label?: string;
};

/**
 * Button that goes back to `href`. If the form is dirty, shows a themed
 * confirmation modal first instead of navigating immediately.
 * Also installs a native `beforeunload` guard so closing the tab / hard
 * navigation also warns the user.
 */
export function CancelButton({
  isDirty,
  href,
  label = "Batal",
}: CancelButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function handleClick() {
    if (isDirty) {
      setOpen(true);
    } else {
      router.push(href);
    }
  }

  function handleConfirmLeave() {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="cancel-trigger-btn"
      >
        <style>{`
          .cancel-trigger-btn {
            padding: 11px 20px;
            border-radius: 10px;
            border: 1px solid var(--admin-border);
            background: var(--admin-surface);
            color: var(--admin-text-secondary);
            font-size: 13.5px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
          }
          .cancel-trigger-btn:hover {
            background: var(--admin-surface-hover);
            color: var(--admin-text-primary);
            border-color: var(--admin-border-strong);
          }
        `}</style>
        {label}
      </button>

      {open && (
        <div className="leave-modal-backdrop" onClick={() => setOpen(false)}>
          <div
            className="leave-modal-scene"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="leave-modal-card">
              <div className="leave-modal-icon">
                <AlertTriangleIcon />
              </div>

              <h3 className="leave-modal-title">Perubahan belum disimpan</h3>
              <p className="leave-modal-desc">
                Kamu memiliki perubahan yang belum disimpan. Jika keluar
                sekarang, perubahan tersebut akan hilang.
              </p>

              <div className="leave-modal-actions">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="leave-modal-btn leave-modal-btn--stay"
                >
                  Tetap di Halaman
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLeave}
                  className="leave-modal-btn leave-modal-btn--leave"
                >
                  Buang Perubahan
                </button>
              </div>
            </div>
          </div>

          <style>{`
            .leave-modal-backdrop {
              position: fixed;
              inset: 0;
              z-index: 100;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(8, 10, 16, 0.55);
              backdrop-filter: blur(4px);
              padding: 20px;
              animation: leaveBackdropIn 0.2s ease both;
            }
            @keyframes leaveBackdropIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .leave-modal-scene {
              perspective: 900px;
              animation: leavePopupIn 0.42s cubic-bezier(0.2, 1.2, 0.4, 1) both;
            }
            @keyframes leavePopupIn {
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

            .leave-modal-card {
              width: min(360px, 90vw);
              border-radius: 18px;
              padding: 26px 24px 22px;
              text-align: center;
              background: var(--admin-bg-elevated);
              border: 1px solid var(--admin-border-strong);
              box-shadow: var(--admin-shadow-lg);
            }

            .leave-modal-icon {
              width: 46px;
              height: 46px;
              margin: 0 auto 14px;
              border-radius: 13px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--admin-warning);
              background: var(--admin-warning-soft);
              animation: leaveIconPop 0.4s cubic-bezier(0.3, 1.4, 0.5, 1) 0.1s both;
            }
            @keyframes leaveIconPop {
              0% { transform: scale(0) rotate(-8deg); opacity: 0; }
              100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }

            .leave-modal-title {
              font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
              font-weight: 700;
              font-size: 16px;
              color: var(--admin-text-primary);
              line-height: 1.4;
            }

            .leave-modal-desc {
              margin-top: 8px;
              font-size: 13px;
              line-height: 1.6;
              color: var(--admin-text-secondary);
            }

            .leave-modal-actions {
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin-top: 20px;
            }

            .leave-modal-btn {
              width: 100%;
              padding: 11px 14px;
              border-radius: 10px;
              font-size: 13.5px;
              font-weight: 600;
              font-family: inherit;
              cursor: pointer;
              transition: background 0.16s ease, border-color 0.16s ease, transform 0.12s ease;
            }

            .leave-modal-btn:active {
              transform: scale(0.98);
            }

            .leave-modal-btn--stay {
              background: var(--admin-accent);
              border: 1px solid var(--admin-accent);
              color: #fff;
            }
            .leave-modal-btn--stay:hover {
              background: var(--admin-accent-hover);
            }

            .leave-modal-btn--leave {
              background: var(--admin-surface);
              border: 1px solid var(--admin-border);
              color: var(--admin-text-secondary);
            }
            .leave-modal-btn--leave:hover {
              background: var(--admin-danger-soft);
              color: var(--admin-danger);
              border-color: rgba(248, 113, 113, 0.3);
            }

            @media (prefers-reduced-motion: reduce) {
              .leave-modal-scene, .leave-modal-icon {
                animation: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
