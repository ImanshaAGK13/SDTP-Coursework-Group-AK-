import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedDomain, 
  setSelectedDomain, 
  domains = [],
  placeholder = "Search projects..." 
}) => {
  return (
    <div className="filter-bar-container">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="premium-input"
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm('')}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="domain-filter-wrapper">
        <div className="filter-label">
          <Filter size={16} />
          <span>Research Domain:</span>
        </div>
        <select 
          className="premium-select"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="All">All Domains</option>
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .filter-bar-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          padding: 16px 24px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 24px;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
        }

        .premium-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }

        .premium-input:focus {
          border-color: #7c3aed;
          background: white;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }

        .clear-btn:hover {
          color: #64748b;
        }

        .domain-filter-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
        }

        .premium-select {
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.9rem;
          color: #1e293b;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }

        .premium-select:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        @media (max-width: 640px) {
          .search-input-wrapper {
            width: 100%;
          }
          .domain-filter-wrapper {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
