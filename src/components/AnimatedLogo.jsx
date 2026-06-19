export const AnimatedLogo = ({ size = 56 }) => {
  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden animated-logo"
      style={{ width: size, height: size }}
    >
      {/* Aurora streams background, scaled down to fit the mark */}
      <div className="absolute inset-0 animated-logo-aurora" aria-hidden="true">
        <div className="animated-logo-stream animated-logo-stream-primary" />
        <div className="animated-logo-stream animated-logo-stream-highlight" />
        <div className="animated-logo-stream animated-logo-stream-sky" />
      </div>

      {/* Hex mark - single outline only */}
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 w-full h-full block animated-logo-hex"
      >
        <defs>
          <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-highlight)" />
          </linearGradient>
        </defs>
        <polygon
          points="50,6 91,28 91,72 50,94 9,72 9,28"
          fill="var(--color-card)"
          stroke="url(#hexStroke)"
          strokeWidth="2.5"
          className="animated-logo-hex-outer"
        />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="var(--color-foreground)"
          fontFamily="Inter, sans-serif"
        >
          KN
        </text>
      </svg>

      <style jsx>{`
        .animated-logo {
          background-color: var(--color-background);
          vertical-align: middle;
        }
        .animated-logo-aurora {
          filter: blur(10px);
        }
        .animated-logo-stream {
          position: absolute;
          width: 140%;
          height: 70%;
          top: 15%;
          left: -20%;
          border-radius: 50%;
          opacity: 0.55;
        }
        .animated-logo-stream-primary {
          background: radial-gradient(
            ellipse at center,
            var(--color-primary) 0%,
            transparent 70%
          );
          animation: logo-drift-a 9s ease-in-out infinite;
        }
        .animated-logo-stream-highlight {
          background: radial-gradient(
            ellipse at center,
            var(--color-highlight) 0%,
            transparent 70%
          );
          opacity: 0.4;
          animation: logo-drift-b 12s ease-in-out infinite;
        }
        .animated-logo-stream-sky {
          background: radial-gradient(
            ellipse at center,
            var(--color-secondary-foreground) 0%,
            transparent 70%
          );
          opacity: 0.35;
          animation: logo-drift-c 15s ease-in-out infinite;
        }
        .animated-logo-hex-outer {
          animation: logo-pulse 4s ease-in-out infinite;
        }
        @keyframes logo-drift-a {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(10%, -8%) scale(1.15);
          }
        }
        @keyframes logo-drift-b {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-12%, 6%) scale(1.1);
          }
        }
        @keyframes logo-drift-c {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(6%, 10%) scale(1.05);
          }
        }
        @keyframes logo-pulse {
          0%,
          100% {
            opacity: 0.75;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};