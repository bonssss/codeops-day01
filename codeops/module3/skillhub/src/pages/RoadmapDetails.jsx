import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Layers,
  BookOpen,
  FolderGit2,
  ExternalLink,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  Briefcase
} from 'lucide-react';
import { getRoadmapById } from '../data/roadmaps';
import { useProgress } from '../hooks/useProgress';
import RoadmapTopicItem from '../components/RoadmapTopicItem';
import ProjectCard from '../components/ProjectCard';

const RoadmapDetails = () => {
  const { id } = useParams();
  const {
    getRoadmapProgress,
    resetRoadmapProgress,
    markStageCompleted,
    isTopicCompleted,
    setLastActiveRoadmapId
  } = useProgress();

  const [activeTab, setActiveTab] = useState('path');
  const [copiedLink, setCopiedLink] = useState(false);
  const [collapsedStages, setCollapsedStages] = useState({});

  const roadmap = useMemo(() => {
    return getRoadmapById(id);
  }, [id]);

  useEffect(() => {
    if (roadmap) {
      setLastActiveRoadmapId(roadmap.id);
      window.scrollTo(0, 0);
    }
  }, [roadmap, setLastActiveRoadmapId]);

  if (!roadmap) {
    return (
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <h2>Roadmap Not Found</h2>
        <Link to="/roadmaps" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          All Roadmaps
        </Link>
      </div>
    );
  }

  const progress = getRoadmapProgress(roadmap);

  const toggleStageCollapse = (stageId) => {
    setCollapsedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReset = () => {
    if (window.confirm(`Reset progress for ${roadmap.title}?`)) {
      resetRoadmapProgress(roadmap.id);
    }
  };

  const allFreeResources = useMemo(() => {
    const list = [];
    roadmap.stages.forEach((stage) => {
      stage.topics.forEach((topic) => {
        if (topic.freeResources) {
          topic.freeResources.forEach((res) => {
            list.push({
              ...res,
              stageTitle: stage.title,
              topicTitle: topic.title
            });
          });
        }
      });
    });
    return list;
  }, [roadmap]);

  return (
    <div className="roadmap-details-page">
      {/* Sleek, Clean Header */}
      <div className="roadmap-details-hero compact">
        <div className="container">
          <div className="roadmap-header-top-row">
            <Link to="/roadmaps" className="breadcrumb-link">
              <ArrowLeft size={14} />
              <span>Roadmaps</span>
            </Link>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleShare}
                className="btn btn-xs btn-share-action"
                aria-label="Share roadmap link"
                title="Share roadmap link"
              >
                <Share2 size={13} />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={progress.completedCount === 0}
                className={`btn btn-xs btn-reset-action ${progress.completedCount === 0 ? 'is-disabled' : ''}`}
                title={progress.completedCount === 0 ? 'No completed topics to reset' : 'Reset roadmap progress'}
                aria-label="Reset roadmap progress"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="roadmap-title-line">
            <h1 className="roadmap-hero-title compact">{roadmap.title}</h1>
            <span className="badge badge-level">{roadmap.level}</span>
          </div>

          <p className="roadmap-hero-tagline">{roadmap.tagline}</p>

          {/* Minimal Inline Progress */}
          <div className="roadmap-inline-progress">
            <div className="inline-progress-labels">
              <span>{progress.completedCount} of {progress.totalCount} completed</span>
              <span className="inline-progress-pct">{progress.percentage}%</span>
            </div>
            <div className="progress-bar-track">
              <div
                className={`progress-bar-fill ${progress.isComplete ? 'complete' : ''}`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clean Tabs */}
      <div className="roadmap-tabs-bar-sticky">
        <div className="container">
          <div className="roadmap-nav-tabs">
            <button
              type="button"
              className={`roadmap-tab-btn ${activeTab === 'path' ? 'active' : ''}`}
              onClick={() => setActiveTab('path')}
            >
              <Layers size={15} />
              <span>Path ({roadmap.stages.length})</span>
            </button>

            <button
              type="button"
              className={`roadmap-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FolderGit2 size={15} />
              <span>Projects ({roadmap.projects ? roadmap.projects.length : 0})</span>
            </button>

            <button
              type="button"
              className={`roadmap-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              <BookOpen size={15} />
              <span>Resources ({allFreeResources.length})</span>
            </button>

            <button
              type="button"
              className={`roadmap-tab-btn ${activeTab === 'career' ? 'active' : ''}`}
              onClick={() => setActiveTab('career')}
            >
              <Briefcase size={15} />
              <span>Career</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="container" style={{ paddingTop: '1.75rem', paddingBottom: '4rem' }}>
        {/* TAB 1: Learning Path */}
        {activeTab === 'path' && (
          <div className="stages-timeline-container">
            {roadmap.stages.map((stage, stageIdx) => {
              const isCollapsed = collapsedStages[stage.id];
              return (
                <div key={stage.id} className="stage-block-card">
                  <div className="stage-header-row">
                    <div
                      className="stage-title-group"
                      onClick={() => toggleStageCollapse(stage.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="stage-number-badge">
                        <span>{stage.stageNumber || stageIdx + 1}</span>
                      </div>
                      <div>
                        <div className="stage-meta-badges">
                          <span className="stage-hours-pill">
                            <Clock size={12} /> {stage.estimatedHours}
                          </span>
                        </div>
                        <h3 className="stage-title-heading">{stage.title}</h3>
                      </div>
                    </div>

                    <div className="stage-actions-group">
                      {(() => {
                        const isStageComplete = stage.topics && stage.topics.length > 0 && stage.topics.every(t => isTopicCompleted(t.id));
                        return (
                          <button
                            type="button"
                            onClick={() => markStageCompleted(stage)}
                            className={`btn btn-xs stage-mark-all-btn ${isStageComplete ? 'stage-done' : ''}`}
                            title={isStageComplete ? 'All topics in this stage completed' : 'Mark all topics in stage as completed'}
                          >
                            <Check size={13} strokeWidth={2.5} />
                            <span>{isStageComplete ? 'Completed' : 'Done'}</span>
                          </button>
                        );
                      })()}

                      <button
                        type="button"
                        onClick={() => toggleStageCollapse(stage.id)}
                        className="stage-collapse-btn"
                        title={isCollapsed ? 'Expand stage' : 'Collapse stage'}
                        aria-label={isCollapsed ? 'Expand stage' : 'Collapse stage'}
                      >
                        {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="stage-topics-wrapper">
                      {stage.topics.map((topic, topicIdx) => (
                        <RoadmapTopicItem
                          key={topic.id}
                          topic={topic}
                          topicIndex={topicIdx}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Practical Projects */}
        {activeTab === 'projects' && (
          <div className="projects-grid-list">
            {roadmap.projects && roadmap.projects.length > 0 ? (
              roadmap.projects.map((proj, pIdx) => (
                <ProjectCard key={proj.id} project={proj} index={pIdx} />
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>
        )}

        {/* TAB 3: All Free Resources */}
        {activeTab === 'resources' && (
          <div className="free-resources-table-container">
            <table className="free-resources-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Provider</th>
                  <th>Format</th>
                  <th>Topic</th>
                  <th>Duration</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {allFreeResources.map((res, idx) => (
                  <tr key={idx}>
                    <td className="res-title-cell">
                      <strong>{res.title}</strong>
                    </td>
                    <td>
                      <span className="table-provider-pill">{res.provider}</span>
                    </td>
                    <td>
                      <span className={`badge ${res.type?.toLowerCase().includes('video') ? 'badge-format-video' : 'badge-level-beginner'}`}>
                        {res.type}
                      </span>
                    </td>
                    <td className="table-topic-cell">{res.topicTitle}</td>
                    <td>{res.duration || 'Self-paced'}</td>
                    <td>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-xs table-open-btn"
                        title="Open free resource"
                      >
                        <span>Open</span>
                        <ExternalLink size={11} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: Career & Interview Prep */}
        {activeTab === 'career' && (
          <div className="career-cards-grid">
            <div className="career-advice-card">
              <h4>Build Real Portfolio Projects</h4>
              <p>
                Implement end-to-end features with tests, clean READMEs, and live deployment. Avoid trivial clones.
              </p>
            </div>

            <div className="career-advice-card">
              <h4>Read & Write Production Code</h4>
              <p>
                Study open-source repositories. Reviewing pull requests and writing documentation proves collaborative engineering readiness.
              </p>
            </div>

            <div className="career-advice-card">
              <h4>Free Interview Practice</h4>
              <p>
                Practice algorithms on <strong>Exercism.org</strong> and study <strong>System Design Primer</strong>.
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <a
                  href="https://exercism.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-xs"
                >
                  Exercism <ExternalLink size={11} />
                </a>
                <a
                  href="https://github.com/donnemartin/system-design-primer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-xs"
                >
                  System Design Primer <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapDetails;
