import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon: Icon = SearchX,
  title = "No resources found",
  message = "We couldn't find any learning resources matching your current search or filter criteria.",
  actionText = "Reset Filters",
  onAction,
  actionLink
}) => {
  return (
    <div className="empty-state-box">
      <div className="empty-state-icon">
        <Icon size={36} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{message}</p>
      
      {actionLink ? (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      ) : onAction ? (
        <button type="button" onClick={onAction} className="btn btn-primary">
          <RotateCcw size={16} />
          {actionText}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
