import React from 'react';
import { Zap, Calendar } from 'lucide-react';
import { LiveMatch } from '@/data/sportsData';

interface HeroProps {
  featuredMatches: LiveMatch[];
  onMatchClick: (match: LiveMatch) => void;
}

const HeroSection: React.FC<HeroProps> = ({ featuredMatches, onMatchClick }) => {
  const liveMatches = featuredMatches.filter(m => m.status === 'live');
  const currentMatch = liveMatches[0] || featuredMatches[0];
  const liveCount = liveMatches.length;

  return (
    <section className="hero-section">
      {/* Ambient Glow Effects */}
      <div className="hero-glow-top" />
      <div className="hero-glow-bottom" />

      {/* Main Content Grid */}
      <div className="hero-container">
        {/* LEFT SIDE: Marketing Content */}
        <div className="hero-content">
          {/* Live Tagline Badge */}
          <div className="live-badge">
            <span className="live-dot" />
            <span>{liveCount} Matches Live Now</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            Every Score. <br />
            <span className="hero-title-gradient">Every Moment.</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Real-time scores, stats, and highlights from every major league. Never miss a play, prediction, or payout.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button
              onClick={() => document.getElementById('live-scores')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-primary"
            >
              <Zap className="w-4 h-4" />
              Live Scores
            </button>
            <button
              onClick={() => document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-secondary"
            >
              <Calendar className="w-4 h-4" />
              Upcoming
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Feature Card */}
        {currentMatch && (
          <div className="hero-card-wrapper">
            <div className="hero-card-glow" />
            <div className="hero-card" onClick={() => onMatchClick(currentMatch)}>
              {/* Card Header */}
              <div className="hero-card-header">
                <span className="hero-card-league">{currentMatch.league} • {currentMatch.sport}</span>
                <span className="hero-card-status">
                  <span className="hero-status-dot" />
                  {currentMatch.time}
                </span>
              </div>

              {/* Score Grid */}
              <div className="hero-score-grid">
                {/* Away Team */}
                <div className="hero-team">
                  <div
                    className="hero-team-badge"
                    style={{ backgroundColor: currentMatch.awayColor }}
                  >
                    {currentMatch.awayAbbr}
                  </div>
                  <p className="hero-team-name">{currentMatch.awayTeam}</p>
                </div>

                {/* Live Score */}
                <div className="hero-score">
                  <div className="hero-score-display">
                    <span>{currentMatch.awayScore}</span>
                    <span className="hero-score-separator">-</span>
                    <span className="hero-score-highlight">{currentMatch.homeScore}</span>
                  </div>
                  <span className="hero-score-label">Live View</span>
                </div>

                {/* Home Team */}
                <div className="hero-team">
                  <div
                    className="hero-team-badge"
                    style={{ backgroundColor: currentMatch.homeColor }}
                  >
                    {currentMatch.homeAbbr}
                  </div>
                  <p className="hero-team-name">{currentMatch.homeTeam}</p>
                </div>
              </div>

              {/* Carousel Pager */}
              <div className="hero-carousel-pager">
                <span className="hero-pager-dot inactive" />
                <span className="hero-pager-dot active" />
                <span className="hero-pager-dot inactive" />
                <span className="hero-pager-dot inactive" />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
          background-color: rgb(3, 7, 18);
          padding: 4rem 1.5rem;
        }

        @media (min-width: 768px) {
          .hero-section {
            padding: 6rem 3rem;
          }
        }

        .hero-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: rgb(17, 24, 39);
        }

        /* Ambient Glow Effects */
        .hero-glow-top {
          position: absolute;
          top: -10rem;
          left: -10rem;
          width: 37.5rem;
          height: 37.5rem;
          border-radius: 50%;
          background-color: rgb(34, 211, 238, 0.1);
          filter: blur(120px);
          pointer-events: none;
        }

        .hero-glow-bottom {
          position: absolute;
          bottom: -10rem;
          right: 0;
          width: 31.25rem;
          height: 31.25rem;
          border-radius: 50%;
          background-color: rgb(37, 99, 235, 0.05);
          filter: blur(100px);
          pointer-events: none;
        }

        /* Main Container */
        .hero-container {
          max-width: 80rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        /* LEFT SIDE: Content */
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
        }

        @media (min-width: 1024px) {
          .hero-content {
            grid-column: span 1;
          }
        }

        /* Live Badge */
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background-color: rgb(244, 63, 94, 0.1);
          border: 1px solid rgb(244, 63, 94, 0.2);
          color: rgb(251, 113, 133);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          width: fit-content;
        }

        .live-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: rgb(244, 63, 94);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Title */
        .hero-title {
          font-size: 2.25rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: white;
          line-height: 1.1;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 3.75rem;
          }
        }

        .hero-title-gradient {
          background: linear-gradient(to right, rgb(34, 211, 238), rgb(96, 165, 250), rgb(99, 102, 241));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Description */
        .hero-description {
          color: rgb(156, 163, 175);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.625;
          max-width: 31.25rem;
        }

        @media (min-width: 768px) {
          .hero-description {
            font-size: 1.125rem;
          }
        }

        /* CTA Buttons */
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 0.5rem;
        }

        .cta-primary {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(to right, rgb(34, 211, 238), rgb(37, 99, 235));
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgb(34, 211, 238, 0.2);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          cursor: pointer;
        }

        .cta-primary:hover {
          background: linear-gradient(to right, rgb(34, 211, 238, 0.9), rgb(37, 99, 235, 0.9));
          transform: translateY(-2px);
        }

        .cta-secondary {
          padding: 0.75rem 1.5rem;
          background-color: rgb(17, 24, 39);
          border: 1px solid rgb(31, 41, 55);
          color: rgb(209, 213, 219);
          font-weight: 700;
          font-size: 0.875rem;
          border-radius: 0.75rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .cta-secondary:hover {
          border-color: rgb(55, 65, 81);
          background-color: rgb(31, 41, 55);
          color: white;
          transform: translateY(-2px);
        }

        /* RIGHT SIDE: Feature Card */
        .hero-card-wrapper {
          display: flex;
          justify-content: center;
          position: relative;
        }

        @media (min-width: 1024px) {
          .hero-card-wrapper {
            justify-content: flex-end;
          }
        }

        .hero-card-wrapper-inner {
          width: 100%;
          max-width: 28rem;
          position: relative;
        }

        .hero-card-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgb(34, 211, 238), rgb(37, 99, 235));
          border-radius: 1rem;
          opacity: 0.2;
          filter: blur(1rem);
          transition: opacity 0.3s;
          z-index: 0;
        }

        .hero-card-wrapper:hover .hero-card-glow {
          opacity: 0.3;
        }

        .hero-card {
          position: relative;
          background-color: rgb(17, 24, 39);
          border: 1px solid rgb(31, 41, 55, 0.8);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(0.5rem);
          cursor: pointer;
          transition: all 0.3s;
          z-index: 1;
        }

        /* Card Header */
        .hero-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .hero-card-league {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgb(107, 114, 128);
          text-transform: uppercase;
        }

        .hero-card-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.625rem;
          border-radius: 0.375rem;
          background-color: rgb(244, 63, 94, 0.1);
          border: 1px solid rgb(244, 63, 94, 0.2);
          color: rgb(251, 113, 133);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-status-dot {
          width: 0.375rem;
          height: 0.375rem;
          border-radius: 50%;
          background-color: rgb(244, 63, 94);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Score Grid */
        .hero-score-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        /* Team */
        .hero-team {
          grid-column: span 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .hero-team-badge {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.125rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          margin: 0 auto;
          color: white;
        }

        .hero-team-name {
          font-weight: 700;
          font-size: 0.875rem;
          color: rgb(229, 231, 235);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        /* Score */
        .hero-score {
          grid-column: span 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .hero-score-display {
          font-size: 1.875rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: white;
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .hero-score-separator {
          color: rgb(75, 85, 99);
          font-weight: 500;
          font-size: 1.25rem;
          align-self: center;
        }

        .hero-score-highlight {
          color: rgb(34, 211, 238);
        }

        .hero-score-label {
          font-size: 0.625rem;
          text-transform: uppercase;
          font-weight: 700;
          color: rgb(107, 114, 128);
          letter-spacing: 0.05em;
        }

        /* Carousel Pager */
        .hero-carousel-pager {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.375rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgb(31, 41, 55, 0.6);
        }

        .hero-pager-dot {
          height: 0.375rem;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .hero-pager-dot.inactive {
          width: 0.375rem;
          background-color: rgb(55, 65, 81);
        }

        .hero-pager-dot.active {
          width: 0.75rem;
          background-color: rgb(34, 211, 238);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
