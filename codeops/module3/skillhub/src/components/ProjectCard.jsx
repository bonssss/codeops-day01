import React from 'react';
import { CheckCircle2, ExternalLink, Code2, Award, Terminal } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const getLevelBadgeClass = (level) => {
    if (level.includes('Beginner')) return 'badge-level-beginner';
    if (level.includes('Intermediate')) return 'badge-level-intermediate';
    return 'badge-level-advanced';
  };

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-title-area">
          <div className="project-index-pill">Project 0{index + 1}</div>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <span className={`badge ${getLevelBadgeClass(project.level)}`}>
          {project.level}
        </span>
      </div>

      <p className="project-description">{project.description}</p>

      {/* Deliverables / Acceptance Criteria */}
      {project.deliverables && project.deliverables.length > 0 && (
        <div className="project-deliverables-box">
          <span className="project-section-heading">Deliverables:</span>
          <ul className="project-deliverables-list">
            {project.deliverables.map((item, idx) => (
              <li key={idx} className="project-deliverable-item">
                <CheckCircle2 size={14} className="deliverable-check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Stack & Starter Link */}
      <div className="project-footer-row">
        <div className="project-stack-wrap">
          <span className="project-stack-label">Stack:</span>
          <span className="project-stack-value">{project.suggestedStack}</span>
        </div>

        {project.freeStarterOrGuide && (
          <a
            href={project.freeStarterOrGuide}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-xs"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
          >
            <span>Guide</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
