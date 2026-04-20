import React from 'react';
import { FileText, Calendar, Code, User, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProposalCard = ({ proposal, onViewDetails }) => {
  return (
    <div className="proposal-card-premium">
      <div className="card-header">
        <div className="header-top">
          <span className="ref-id">#PRP-{proposal.id.toString().padStart(4, '0')}</span>
          <StatusBadge status={proposal.status} />
        </div>
        <h3 className="proposal-title">{proposal.title}</h3>
      </div>
      
      <div className="card-body">
        <p className="proposal-abstract">
          {proposal.abstract?.length > 150 
            ? `${proposal.abstract.substring(0, 150)}...` 
            : proposal.abstract}
        </p>
        
        <div className="meta-grid">
          <div className="meta-item">
            <User size={14} />
            <span>ID: {proposal.studentId || proposal.userId}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="meta-item full-width">
            <Code size={14} />
            <div className="tech-tags">
              {proposal.techStack?.split(',').map(tech => (
                <span key={tech} className="tech-tag">{tech.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <button className="view-details-btn" onClick={() => onViewDetails(proposal.id)}>
          <span>View Dossier</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <style jsx>{`
        .proposal-card-premium {
          background: white;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }

        .proposal-card-premium:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          border-color: #e2e8f0;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .ref-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .proposal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.4;
        }

        .proposal-abstract {
          font-size: 0.925rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.85rem;
        }

        .full-width {
          grid-column: span 2;
          margin-top: 4px;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-tag {
          background: #f8fafc;
          color: #475569;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
        }

        .view-details-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #7c3aed;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .view-details-btn:hover {
          background: #6d28d9;
        }
      `}</style>
    </div>
  );
};

export default ProposalCard;
