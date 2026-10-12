import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  CheckCircle,
  Compass,
  ArrowRight,
  Flame,
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useFavorites } from '../context/FavoritesContext';
import { ROADMAPS, getRoadmapById } from '../data/roadmaps';
import RoadmapCard from '../components/RoadmapCard';

const ProgressDashboard = () => {
  const {
    completedTopicIds,
    lastActiveRoadmapId,
    getRoadmapProgress,
    overallStats
  } = useProgress();

  const { favoritesCount } = useFavorites();

  const lastActiveRoadmap = useMemo(() => {
    return getRoadmapById(lastActiveRoadmapId) || ROADMAPS[0];
  }, [lastActiveRoadmapId]);

  const { inProgressRoadmaps, completedRoadmaps, notStartedRoadmaps } = useMemo(() => {
    const inProgress = [];
    const completed = [];
    const notStarted = [];

    ROADMAPS.forEach((roadmap) => {
      const progress = getRoadmapProgress(roadmap);
      if (progress.isComplete) {
        completed.push({ roadmap, progress });
      } else if (progress.completedCount > 0) {
        inProgress.push({ roadmap, progress });
      } else {
        notStarted.push({ roadmap, progress });
      }
    });

    return {
      inProgressRoadmaps: inProgress,
      completedRoadmaps: completed,
      notStartedRoadmaps: notStarted
    };
  }, [getRoadmapProgress]);

  const badges = useMemo(() => {
    return [
      {
        id: 'first-step',
        title: 'First Step',
        description: 'Completed 1 topic',
        icon: CheckCircle,
        unlocked: completedTopicIds.length >= 1
      },
      {
        id: 'consistent-learner',
        title: '5 Topics',
        description: 'Completed 5 topics',
        icon: Flame,
        unlocked: completedTopicIds.length >= 5
      },
      {
        id: 'deep-diver',
        title: '15 Topics',
        description: 'Completed 15 topics',
        icon: Trophy,
        unlocked: completedTopicIds.length >= 15
      },
      {
        id: 'curator',
        title: 'Bookmarker',
        description: 'Saved 3 resources',
        icon: Heart,
        unlocked: favoritesCount >= 3
      },
      {
        id: 'stack-finisher',
        title: 'Finisher',
        description: 'Finished 1 roadmap',
        icon: Award,
        unlocked: completedRoadmaps.length >= 1
      }
    ];
  }, [completedTopicIds.length, favoritesCount, completedRoadmaps.length]);

  return (
    <div className="tracker-page container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Clean Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 className="page-hero-title" style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>
          Learning Tracker
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: 0 }}>
          Your progress, active roadmaps, and completed milestones.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="tracker-stats-grid">
        <div className="tracker-kpi-card">
          <div className="kpi-icon-box blue">
            <CheckCircle size={20} />
          </div>
          <div className="kpi-info">
            <div className="kpi-value">{overallStats.completedTopicsCount}</div>
            <div className="kpi-label">Topics Done</div>
          </div>
        </div>

        <div className="tracker-kpi-card">
          <div className="kpi-icon-box amber">
            <Layers size={20} />
          </div>
          <div className="kpi-info">
            <div className="kpi-value">{overallStats.activeRoadmapsCount}</div>
            <div className="kpi-label">In Progress</div>
          </div>
        </div>

        <div className="tracker-kpi-card">
          <div className="kpi-icon-box emerald">
            <Award size={20} />
          </div>
          <div className="kpi-info">
            <div className="kpi-value">{overallStats.completedRoadmapsCount}</div>
            <div className="kpi-label">Mastered</div>
          </div>
        </div>

        <div className="tracker-kpi-card">
          <div className="kpi-icon-box rose">
            <Heart size={20} />
          </div>
          <div className="kpi-info">
            <div className="kpi-value">{favoritesCount}</div>
            <div className="kpi-label">Bookmarks</div>
          </div>
        </div>
      </div>

      {/* Resume Banner */}
      {lastActiveRoadmap && (
        <div className="continue-learning-card compact">
          <div className="continue-left">
            <span className="continue-subtitle">Continue Where You Left Off</span>
            <h3 className="continue-title" style={{ fontSize: '1.25rem' }}>{lastActiveRoadmap.title}</h3>
          </div>
          <Link to={`/roadmap/${lastActiveRoadmap.id}`} className="btn btn-primary btn-sm">
            <span>Resume</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* In-Progress Tracks */}
      <div className="tracker-section" style={{ marginTop: '2.5rem' }}>
        <h2 className="tracker-section-title">In Progress ({inProgressRoadmaps.length})</h2>

        {inProgressRoadmaps.length === 0 ? (
          <div className="tracker-empty-card compact">
            <Compass size={32} className="empty-tracker-icon" />
            <p style={{ margin: '0 0 0.75rem' }}>No active roadmaps in progress yet.</p>
            <Link to="/roadmaps" className="btn btn-primary btn-sm">
              Explore Roadmaps
            </Link>
          </div>
        ) : (
          <div className="roadmaps-grid">
            {inProgressRoadmaps.map(({ roadmap }) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}
      </div>

      {/* Milestones */}
      <div className="tracker-section" style={{ marginTop: '2.5rem' }}>
        <h2 className="tracker-section-title">Milestones</h2>
        <div className="badges-grid">
          {badges.map((badge) => {
            const IconComp = badge.icon;
            return (
              <div
                key={badge.id}
                className={`achievement-badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon-circle">
                  <IconComp size={18} />
                </div>
                <div className="achievement-meta">
                  <span className="achievement-title">{badge.title}</span>
                  <p className="achievement-desc">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Roadmaps */}
      {completedRoadmaps.length > 0 && (
        <div className="tracker-section" style={{ marginTop: '2.5rem' }}>
          <h2 className="tracker-section-title">Mastered ({completedRoadmaps.length})</h2>
          <div className="roadmaps-grid">
            {completedRoadmaps.map(({ roadmap }) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        </div>
      )}

      {/* Explore More Tracks */}
      <div className="tracker-section" style={{ marginTop: '2.5rem' }}>
        <h2 className="tracker-section-title">Other Tracks</h2>
        <div className="roadmaps-grid">
          {notStartedRoadmaps.slice(0, 3).map(({ roadmap }) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
