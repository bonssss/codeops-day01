import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';
import { ROADMAPS } from '../data/roadmaps';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  // Array of completed topic IDs
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    return getStoredItem(STORAGE_KEYS.PROGRESS, []);
  });

  const [lastActiveRoadmapId, setLastActiveRoadmapId] = useState(() => {
    return getStoredItem(STORAGE_KEYS.LAST_ACTIVE, 'frontend-development');
  });

  const [progressToast, setProgressToast] = useState(null);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.PROGRESS, completedTopicIds);
  }, [completedTopicIds]);

  useEffect(() => {
    if (lastActiveRoadmapId) {
      setStoredItem(STORAGE_KEYS.LAST_ACTIVE, lastActiveRoadmapId);
    }
  }, [lastActiveRoadmapId]);

  const showProgressNotification = (message, type = 'success') => {
    setProgressToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setProgressToast(null);
    }, 3200);
  };

  const isTopicCompleted = useCallback((topicId) => {
    return completedTopicIds.includes(topicId);
  }, [completedTopicIds]);

  const toggleTopic = useCallback((topicId, topicTitle = '') => {
    if (!topicId) return;

    setCompletedTopicIds((prev) => {
      const exists = prev.includes(topicId);
      if (exists) {
        showProgressNotification(
          topicTitle ? `Unmarked "${topicTitle}"` : 'Topic marked incomplete',
          'info'
        );
        return prev.filter((id) => id !== topicId);
      } else {
        showProgressNotification(
          topicTitle ? `Completed "${topicTitle}"! 🎉` : 'Topic marked completed! 🎉',
          'success'
        );
        return [...prev, topicId];
      }
    });
  }, []);

  const markStageCompleted = useCallback((stage) => {
    if (!stage || !stage.topics) return;
    const stageTopicIds = stage.topics.map((t) => t.id);
    setCompletedTopicIds((prev) => {
      const combined = Array.from(new Set([...prev, ...stageTopicIds]));
      return combined;
    });
    showProgressNotification(`Completed all topics in "${stage.title}"! 🚀`, 'success');
  }, []);

  const markStageIncomplete = useCallback((stage) => {
    if (!stage || !stage.topics) return;
    const stageTopicIds = new Set(stage.topics.map((t) => t.id));
    setCompletedTopicIds((prev) => prev.filter((id) => !stageTopicIds.has(id)));
    showProgressNotification(`Reset topics in "${stage.title}"`, 'info');
  }, []);

  const resetRoadmapProgress = useCallback((roadmapId) => {
    const roadmap = ROADMAPS.find((r) => r.id === roadmapId);
    if (!roadmap) return;

    const roadmapTopicIds = new Set();
    roadmap.stages.forEach((stage) => {
      stage.topics.forEach((topic) => roadmapTopicIds.add(topic.id));
    });

    setCompletedTopicIds((prev) => prev.filter((id) => !roadmapTopicIds.has(id)));
    showProgressNotification(`Reset all progress for ${roadmap.title}`, 'info');
  }, []);

  // Compute progress for a specific roadmap
  const getRoadmapProgress = useCallback((roadmap) => {
    if (!roadmap || !roadmap.stages) {
      return { completedCount: 0, totalCount: 0, percentage: 0, isComplete: false };
    }

    let totalCount = 0;
    let completedCount = 0;

    roadmap.stages.forEach((stage) => {
      stage.topics.forEach((topic) => {
        totalCount += 1;
        if (completedTopicIds.includes(topic.id)) {
          completedCount += 1;
        }
      });
    });

    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isComplete = totalCount > 0 && completedCount === totalCount;

    return {
      completedCount,
      totalCount,
      percentage,
      isComplete
    };
  }, [completedTopicIds]);

  // Overall platform progress
  const overallStats = useMemo(() => {
    let totalTopics = 0;
    let activeRoadmapsCount = 0;
    let completedRoadmapsCount = 0;

    ROADMAPS.forEach((roadmap) => {
      let rTotal = 0;
      let rCompleted = 0;

      roadmap.stages.forEach((stage) => {
        stage.topics.forEach((topic) => {
          totalTopics += 1;
          rTotal += 1;
          if (completedTopicIds.includes(topic.id)) {
            rCompleted += 1;
          }
        });
      });

      if (rCompleted > 0 && rCompleted < rTotal) {
        activeRoadmapsCount += 1;
      } else if (rCompleted > 0 && rCompleted === rTotal) {
        completedRoadmapsCount += 1;
      }
    });

    const completedTopicsCount = completedTopicIds.length;
    const overallPercentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

    return {
      totalTopics,
      completedTopicsCount,
      overallPercentage,
      activeRoadmapsCount,
      completedRoadmapsCount
    };
  }, [completedTopicIds]);

  const exportProgressData = useCallback(() => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      completedTopicIds,
      lastActiveRoadmapId
    };
    return JSON.stringify(data);
  }, [completedTopicIds, lastActiveRoadmapId]);

  const importProgressData = useCallback((rawString) => {
    try {
      if (!rawString || typeof rawString !== 'string') {
        throw new Error('Empty payload');
      }
      const data = JSON.parse(rawString.trim());
      if (Array.isArray(data.completedTopicIds)) {
        setCompletedTopicIds(data.completedTopicIds);
        if (data.lastActiveRoadmapId) {
          setLastActiveRoadmapId(data.lastActiveRoadmapId);
        }
        showProgressNotification(`Restored ${data.completedTopicIds.length} completed topics! 🚀`, 'success');
        return true;
      }
      throw new Error('Invalid format');
    } catch (e) {
      showProgressNotification('Invalid sync code or backup format.', 'error');
      return false;
    }
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        completedTopicIds,
        lastActiveRoadmapId,
        setLastActiveRoadmapId,
        isTopicCompleted,
        toggleTopic,
        markStageCompleted,
        markStageIncomplete,
        resetRoadmapProgress,
        getRoadmapProgress,
        overallStats,
        progressToast,
        exportProgressData,
        importProgressData
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
