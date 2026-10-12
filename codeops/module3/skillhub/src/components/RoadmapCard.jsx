import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Server,
  Layers,
  Smartphone,
  Terminal,
  ShieldCheck,
  BarChart3,
  Database,
  BrainCircuit,
  CheckCircle,
  Cloud,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

const iconMap = {
  Layout,
  Server,
  Layers,
  Smartphone,
  Terminal,
  ShieldCheck,
  BarChart3,
  Database,
  BrainCircuit,
  CheckCircle,
  Cloud,
  Cpu
};

const RoadmapCard = ({ roadmap }) => {
  const { getRoadmapProgress } = useProgress();
  const progress = getRoadmapProgress(roadmap);

  const IconComponent = iconMap[roadmap.icon] || Layout;

  const totalResources = roadmap.stages.reduce((acc, stage) => {
    return acc + stage.topics.reduce((tAcc, topic) => tAcc + (topic.freeResources ? topic.freeResources.length : 0), 0);
  }, 0);

  const projectsCount = roadmap.projects ? roadmap.projects.length : 0;

  return (
    <div className="roadmap-card">
      <div className="roadmap-card-header">
        <div className="roadmap-icon-wrapper">
          <IconComponent size={20} />
        </div>
        <span className="badge badge-level">{roadmap.level}</span>
      </div>

      <div className="roadmap-card-body">
        <h3 className="roadmap-title">{roadmap.title}</h3>
        <p className="roadmap-tagline">{roadmap.tagline}</p>

        {/* Minimal Progress Bar (only shown when in progress or completed) */}
        {progress.completedCount > 0 ? (
          <div className="roadmap-progress-container compact">
            <div className="roadmap-progress-labels">
              <span className="progress-status-text">
                {progress.isComplete ? 'Completed 🏆' : `${progress.completedCount}/${progress.totalCount} topics`}
              </span>
              <span className="progress-percentage-val">{progress.percentage}%</span>
            </div>
            <div className="progress-bar-track">
              <div
                className={`progress-bar-fill ${progress.isComplete ? 'complete' : ''}`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="roadmap-meta-simple">
            <span>{roadmap.stages.length} stages</span>
            <span>•</span>
            <span>{totalResources} resources</span>
            <span>•</span>
            <span>{projectsCount} projects</span>
          </div>
        )}
      </div>

      <div className="roadmap-card-footer">
        <Link
          to={`/roadmap/${roadmap.id}`}
          className={`btn ${progress.percentage > 0 ? 'btn-primary' : 'btn-outline'} btn-sm w-full`}
          style={{ justifyContent: 'center' }}
        >
          <span>{progress.percentage > 0 ? 'Continue' : 'View Path'}</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
};

export default RoadmapCard;
