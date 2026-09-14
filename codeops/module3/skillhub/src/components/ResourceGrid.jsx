import React from 'react';
import ResourceCard from './ResourceCard';
import EmptyState from './EmptyState';
import { ResourceCardSkeleton } from './LoadingSpinner';

const ResourceGrid = ({
  resources = [],
  isLoading = false,
  viewMode = 'grid',
  emptyTitle,
  emptyMessage,
  onResetFilters
}) => {
  if (isLoading) {
    return (
      <div className="resource-grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <ResourceCardSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || "No learning resources found"}
        message={emptyMessage || "Try adjusting your search keywords, clearing applied filters, or selecting a different category."}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className={viewMode === 'list' ? 'resource-list-view' : 'resource-grid'}>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;
