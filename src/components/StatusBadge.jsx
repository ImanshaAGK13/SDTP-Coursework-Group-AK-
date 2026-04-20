import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { bg: '#fff7ed', text: '#c2410c', border: '#ffedd5', label: 'PENDING' };
      case 'matched':
      case 'approved':
        return { bg: '#f0fdf4', text: '#15803d', border: '#dcfce7', label: 'MATCHED' };
      case 'reviewing':
        return { bg: '#eff6ff', text: '#1d4ed8', border: '#dbeafe', label: 'REVIEWING' };
      case 'rejected':
        return { bg: '#fef2f2', text: '#b91c1c', border: '#fee2e2', label: 'REJECTED' };
      default:
        return { bg: '#f9fafb', text: '#374151', border: '#f3f4f6', label: status?.toUpperCase() || 'UNKNOWN' };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 10px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      backgroundColor: styles.bg,
      color: styles.text,
      border: `1px solid ${styles.border}`,
      textTransform: 'uppercase',
      letterSpacing: '0.025em'
    }}>
      {styles.label}
    </span>
  );
};

export default StatusBadge;
