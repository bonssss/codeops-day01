import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  CheckCircle,
  Compass,
  ArrowRight,
  Flame,
  Award,
  Layers,
  Heart,
  Laptop,
  Smartphone,
  Download,
  Upload,
  Copy,
  Check,
  X,
  RefreshCw,
  HelpCircle
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
    overallStats,
    exportProgressData,
    importProgressData
  } = useProgress();

  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncCode, setSyncCode] = useState('');
  const [copiedSync, setCopiedSync] = useState(false);
  const [importInput, setImportInput] = useState('');
  const [syncTab, setSyncTab] = useState('export');

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

  const handleOpenSync = () => {
    setSyncCode(exportProgressData());
    setCopiedSync(false);
    setImportInput('');
    setShowSyncModal(true);
  };

  const handleCopySync = () => {
    navigator.clipboard.writeText(syncCode);
    setCopiedSync(true);
    setTimeout(() => setCopiedSync(false), 2200);
  };

  const handleDownloadBackup = () => {
    const blob = new Blob([syncCode], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skiilhub-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyImport = () => {
    if (!importInput.trim()) return;
    const success = importProgressData(importInput);
    if (success) {
      setShowSyncModal(false);
      setImportInput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImportInput(evt.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="tracker-page container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Clean Header with Cross-Device Sync Action */}
      <div className="tracker-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <h1 className="page-hero-title" style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>
            Learning Tracker
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: 0 }}>
            Your progress, active roadmaps, and completed milestones.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenSync}
          className="btn btn-outline btn-sm sync-devices-btn"
          title="Backup or sync your progress across different devices"
        >
          <Smartphone size={15} />
          <Laptop size={15} />
          <span>Cross-Device Sync</span>
        </button>
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

      {/* Cross-Device Sync Modal */}
      {showSyncModal && (
        <div className="sync-modal-overlay" onClick={() => setShowSyncModal(false)}>
          <div className="sync-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="sync-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div className="sync-modal-icon-badge">
                  <RefreshCw size={18} color="var(--accent)" />
                </div>
                <div>
                  <h3 className="sync-modal-title">Cross-Device Sync & Backup</h3>
                  <span className="sync-modal-subtitle">Transfer progress between Phone, Laptop & Tablet</span>
                </div>
              </div>
              <button
                type="button"
                className="sync-modal-close-btn"
                onClick={() => setShowSyncModal(false)}
                aria-label="Close sync modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sync Tabs */}
            <div className="sync-modal-tabs">
              <button
                type="button"
                className={`sync-tab-btn ${syncTab === 'export' ? 'active' : ''}`}
                onClick={() => setSyncTab('export')}
              >
                <Download size={14} />
                <span>Export for Another Device</span>
              </button>
              <button
                type="button"
                className={`sync-tab-btn ${syncTab === 'import' ? 'active' : ''}`}
                onClick={() => setSyncTab('import')}
              >
                <Upload size={14} />
                <span>Import / Restore</span>
              </button>
            </div>

            <div className="sync-modal-body">
              {syncTab === 'export' ? (
                <div>
                  <p className="sync-info-text">
                    skiilhub is privacy-first and saves your progress locally in your browser. Copy your sync payload or download the backup file to restore it on any other phone, tablet, or computer:
                  </p>

                  <div className="sync-code-box">
                    <pre className="sync-code-content">{syncCode}</pre>
                  </div>

                  <div className="sync-actions-row">
                    <button
                      type="button"
                      onClick={handleCopySync}
                      className="btn btn-primary btn-sm"
                    >
                      {copiedSync ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedSync ? 'Copied to Clipboard!' : 'Copy Sync Code'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadBackup}
                      className="btn btn-outline btn-sm"
                    >
                      <Download size={14} />
                      <span>Download Backup JSON</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="sync-info-text">
                    Paste your sync code or upload your backup file from another device to restore all your completed roadmap topics:
                  </p>

                  <textarea
                    className="sync-import-textarea"
                    rows={5}
                    placeholder="Paste your sync JSON code here..."
                    value={importInput}
                    onChange={(e) => setImportInput(e.target.value)}
                  />

                  <div className="sync-actions-row">
                    <button
                      type="button"
                      onClick={handleApplyImport}
                      disabled={!importInput.trim()}
                      className="btn btn-primary btn-sm"
                    >
                      <Upload size={14} />
                      <span>Restore Progress Now</span>
                    </button>

                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                      <Download size={14} />
                      <span>Upload JSON File</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="sync-explainer-box">
                <HelpCircle size={15} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent)' }} />
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <strong>How Cross-Device Tracking Works:</strong> skiilhub stores all progress locally in your browser with zero logins required. To continue on your phone or work machine, export your progress here and paste it on your other device!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;
