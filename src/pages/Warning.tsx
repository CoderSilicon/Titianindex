import React from "react";

type DangerWarningProps = {
  targetUrl?: string;
  onBack?: () => void;
  onProceed?: () => void;
};

const DangerWarning: React.FC<DangerWarningProps> = ({
  targetUrl = "Unknown destination",
  onBack,
  onProceed,
}) => {
  const handleBack = () => {
    onBack ? onBack() : window.history.back();
  };

  const handleProceed = () => {
    const confirmed = confirm(
      "⚠️ Are you absolutely sure you want to proceed? This link may be dangerous."
    );
    if (!confirmed) return;

    if (onProceed) {
      onProceed();
    } else if (targetUrl !== "Unknown destination") {
      window.location.href = targetUrl;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-red-950 text-white px-4">
      <div className="w-full max-w-xl border-2 border-red-600 bg-neutral-950 shadow-[0_0_50px_rgba(255,0,0,0.3)] animate-[slideIn_0.4s_ease-out]">

        {/* Header */}
        <div className="bg-gradient-to-br from-red-500 to-red-800 text-center p-8 border-b-2 border-red-600">
          <div className="text-6xl animate-pulse">⚠</div>
          <h1 className="mt-4 text-3xl font-black tracking-widest uppercase">
            Dangerous Link
          </h1>
        </div>

        {/* Content */}
        <div className="p-10">
          <p className="text-center text-neutral-400 text-lg leading-relaxed">
            This link may lead to an unsafe destination. Proceeding could expose
            you to phishing attempts, malware, or deceptive content.
          </p>

          {/* URL display */}
          <div className="mt-8 bg-neutral-900 border border-neutral-700 p-4 font-mono text-sm break-all text-red-400">
            {targetUrl}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4">
            <button
              onClick={handleBack}
              className="py-4 font-bold uppercase tracking-wide bg-gradient-to-br from-emerald-400 to-emerald-600 text-black hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              ← Take Me Back
            </button>

            <button
              onClick={handleProceed}
              className="py-3 text-xs uppercase tracking-wider border border-neutral-700 text-neutral-400 opacity-40 hover:opacity-100 hover:text-red-500 hover:border-red-600 transition"
            >
              I understand the risks, proceed anyway
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DangerWarning;
