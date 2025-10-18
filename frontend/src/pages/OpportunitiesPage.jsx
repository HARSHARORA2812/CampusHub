import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts';
import { OpportunityCard } from '../components/cards';
import { OpportunityDetailModal, CreateOpportunityModal } from '../components/modals';
import { API, getCollegeName } from '../utils';

export function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${API}/opportunities`);
      // Filter opportunities by college
      const userCollege = getCollegeName(user?.email);
      const filteredOpportunities = response.data.filter(opp => {
        const oppCollege = getCollegeName(opp.posted_by_email || opp.college_email);
        return userCollege && oppCollege && userCollege.toLowerCase() === oppCollege.toLowerCase();
      });
      setOpportunities(filteredOpportunities);
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-loading">Loading opportunities...</div>;

  const collegeName = getCollegeName(user?.email);
  
  // Check if user can create opportunities (college_management or higher)
  const canCreateOpportunity = ['college_management', 'college_admin', 'main_admin'].includes(user?.role);

  return (
    <div className="page-container" data-testid="opportunities-page">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Opportunities</h1>
          {collegeName && (
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #666)', marginTop: '0.25rem' }}>
              🎓 Showing opportunities from <strong>{collegeName}</strong>
            </div>
          )}
        </div>
        
        {canCreateOpportunity && (
          <button 
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0,
              flex: 'none',
              width: 'auto'
            }}
          >
            <span>📢</span>
            <span>Post Opportunity</span>
          </button>
        )}
      </div>
      <div className="cards-grid">
        {opportunities.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} onClick={() => setSelectedOpp(opp)} />
        ))}
      </div>
      
      {selectedOpp && <OpportunityDetailModal opportunity={selectedOpp} onClose={() => setSelectedOpp(null)} />}
      
      {showCreateModal && (
        <CreateOpportunityModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchOpportunities}
        />
      )}
    </div>
  );
}
