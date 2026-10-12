import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Layers,
  BookOpen,
  FolderGit2,
  Trophy
} from 'lucide-react';
import Hero from '../components/Hero';
import RoadmapCard from '../components/RoadmapCard';
import ResourceCard from '../components/ResourceCard';
import { ROADMAPS } from '../data/roadmaps';
import { RESOURCES } from '../data/resources';
import { useProgress } from '../hooks/useProgress';

const Home = () => {
  const { overallStats, lastActiveRoadmapId } = useProgress();

  const featuredRoadmaps = useMemo(() => {
    const priorityIds = [
      'frontend-development',
      'backend-development',
      'fullstack-development',
      'devops-cloud',
      'cybersecurity',
      'ai-machine-learning'
    ];
    return ROADMAPS.filter((r) => priorityIds.includes(r.id));
  }, []);

  const featuredFreeResources = useMemo(() => {
    return RESOURCES.filter((r) => r.featured).slice(0, 4);
  }, []);

  return (
    <div className="home-page">
      <Hero />

      {/* Progress Resume Banner */}
      {overallStats.completedTopicsCount > 0 && (
        <section className="container" style={{ marginTop: '-0.5rem', marginBottom: '2rem' }}>
          <div className="tracker-snapshot-banner compact">
            <div className="snapshot-left">
              <Trophy size={20} className="snapshot-sparkle" />
              <div>
                <span className="snapshot-heading">
                  <strong>{overallStats.completedTopicsCount}</strong> topics completed
                </span>
                <span className="snapshot-text"> · Keep your momentum going</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/roadmap/${lastActiveRoadmapId}`} className="btn btn-primary btn-sm">
                Resume <ArrowRight size={13} />
              </Link>
              <Link to="/tracker" className="btn btn-secondary btn-sm">
                Tracker
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Roadmaps */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Career Roadmaps</h2>
              <p className="section-subtitle">Choose a path from fundamentals to production.</p>
            </div>
            <Link to="/roadmaps" className="btn btn-secondary btn-sm">
              All 11 Tracks <ArrowRight size={14} />
            </Link>
          </div>

          <div className="roadmaps-grid">
            {featuredRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        </div>
      </section>

      {/* Clean 3-Pillar Value Strip */}
      <section style={{ padding: '3rem 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="pillars-grid compact">
            <div className="pillar-item-card compact">
              <div className="pillar-icon-box compact">
                <CheckCircle2 size={20} color="var(--emerald)" />
              </div>
              <h4>100% Free Resources</h4>
              <p>MDN, freeCodeCamp, CS50, and official documentation without paywalls.</p>
            </div>

            <div className="pillar-item-card compact">
              <div className="pillar-icon-box compact">
                <Layers size={20} color="var(--accent)" />
              </div>
              <h4>Structured Sequence</h4>
              <p>Step-by-step topics with clear prerequisites so you always know what's next.</p>
            </div>

            <div className="pillar-item-card compact">
              <div className="pillar-icon-box compact">
                <FolderGit2 size={20} color="var(--amber)" />
              </div>
              <h4>Real Projects</h4>
              <p>Hands-on coding challenges and capstone systems to build an authentic portfolio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Free Resources */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Free Library Spotlight</h2>
              <p className="section-subtitle">Vetted open materials from Harvard, Mozilla, and official projects.</p>
            </div>
            <Link to="/explore" className="btn btn-secondary btn-sm">
              Browse Library <ArrowRight size={14} />
            </Link>
          </div>

          <div className="resource-grid">
            {featuredFreeResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
