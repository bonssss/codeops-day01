import React, { useState } from 'react';
import {
  Check,
  ExternalLink,
  BookOpen,
  Video,
  Code,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

const getResourceIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'video':
    case 'video course':
    case 'video series':
      return <Video size={13} />;
    case 'interactive':
    case 'interactive sandbox':
    case 'hands-on wargame':
    case 'hands-on challenges':
      return <Code size={13} />;
    case 'documentation':
    case 'book':
    case 'official book':
      return <FileText size={13} />;
    default:
      return <BookOpen size={13} />;
  }
};

const RoadmapTopicItem = ({ topic, topicIndex }) => {
  const { isTopicCompleted, toggleTopic } = useProgress();
  const [expanded, setExpanded] = useState(true);

  const completed = isTopicCompleted(topic.id);

  return (
    <div className={`topic-item-card ${completed ? 'completed' : ''}`}>
      <div className="topic-header-row">
        <button
          type="button"
          onClick={() => toggleTopic(topic.id, topic.title)}
          className={`topic-checkbox-btn ${completed ? 'checked' : ''}`}
          aria-label={completed ? `Mark incomplete` : `Mark completed`}
          title={completed ? 'Click to uncheck' : 'Click to mark complete'}
        >
          {completed && <Check size={13} strokeWidth={3} />}
        </button>

        <div className="topic-info-main" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
          <h4 className={`topic-title-text ${completed ? 'line-through' : ''}`}>
            {topic.title}
          </h4>
          <p className="topic-summary-text">{topic.summary}</p>
        </div>

        <button
          type="button"
          className="topic-expand-toggle"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? 'Collapse details' : 'Expand details'}
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
        >
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {expanded && (
        <div className="topic-content-body">
          {/* Key skills pills */}
          {topic.skills && topic.skills.length > 0 && (
            <div className="topic-skills-list">
              {topic.skills.map((skill, idx) => (
                <span key={idx} className="topic-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Curated Free Resources */}
          {topic.freeResources && topic.freeResources.length > 0 && (
            <div className="topic-resources-grid">
              {topic.freeResources.map((res, rIdx) => (
                <a
                  key={rIdx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="topic-resource-card"
                >
                  <div className="resource-icon-badge">
                    {getResourceIcon(res.type)}
                  </div>
                  <div className="resource-meta-info">
                    <div className="resource-title-row">
                      <span className="resource-title-name">{res.title}</span>
                      <ExternalLink size={12} className="resource-ext-icon" />
                    </div>
                    <div className="resource-sub-meta">
                      <span className="resource-provider-pill">{res.provider}</span>
                      <span className="resource-type-text">{res.type}</span>
                      {res.duration && (
                        <>
                          <span className="meta-bullet">•</span>
                          <span>{res.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadmapTopicItem;
