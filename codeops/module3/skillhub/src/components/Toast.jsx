import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useProgress } from '../hooks/useProgress';

const Toast = () => {
  const { toastMessage, setToastMessage } = useFavorites();
  const { progressToast } = useProgress();

  const currentToast = progressToast || toastMessage;

  if (!currentToast) return null;

  const getIcon = () => {
    switch (currentToast.type) {
      case 'add':
      case 'success':
        return <CheckCircle2 size={18} color="#34d399" />;
      case 'remove':
        return <AlertCircle size={18} color="#fb7185" />;
      default:
        return <Info size={18} color="#818cf8" />;
    }
  };

  return (
    <div className="toast-container" role="alert">
      <div className="toast-item">
        {getIcon()}
        <span>{currentToast.message}</span>
        {setToastMessage && toastMessage && (
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
