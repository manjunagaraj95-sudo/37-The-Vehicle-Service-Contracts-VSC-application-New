
import React, { useState, useEffect } from 'react';
// import './App.css'; // This would be the actual import in a real project

// Dummy Data
const DUMMY_CONTRACTS = [
  {
    id: 'VSC001',
    contractNumber: 'VSC-2023-0001',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleVIN: '1HFBH4G2X12345678',
    planType: 'Platinum',
    startDate: '2023-01-15',
    endDate: '2028-01-15',
    premiumAmount: 2500,
    status: 'ACTIVE',
    customer: { id: 'CUST001', name: 'Alice Smith' },
    dealership: { id: 'DEAL001', name: 'AutoNation Dallas' },
    workflowStage: 'Active',
    milestones: [
      { name: 'Contract Initiated', date: '2023-01-10', status: 'COMPLETED' },
      { name: 'Underwriting Approved', date: '2023-01-12', status: 'COMPLETED' },
      { name: 'Contract Signed', date: '2023-01-15', status: 'COMPLETED' },
      { name: 'Service Period', date: null, status: 'ON_TRACK' },
      { name: 'Renewal Reminder', date: null, status: 'PENDING' },
    ],
    slaStatus: 'ON_TRACK',
    documents: [{ name: 'VSC Contract (PDF)', url: '/dummy-vsc-contract.pdf' }],
    auditLogs: [
      { id: 'AL001', timestamp: '2023-01-10 10:00 AM', user: 'DealershipAdmin', action: 'Contract VSC-2023-0001 created' },
      { id: 'AL002', timestamp: '2023-01-12 11:30 AM', user: 'Underwriter', action: 'Contract VSC-2023-0001 approved' },
    ]
  },
  {
    id: 'VSC002',
    contractNumber: 'VSC-2023-0002',
    vehicleMake: 'Honda',
    vehicleModel: 'CR-V',
    vehicleVIN: '5J6RA1H3X22345678',
    planType: 'Gold',
    startDate: '2023-02-01',
    endDate: '2028-02-01',
    premiumAmount: 1800,
    status: 'UNDER_REVIEW',
    customer: { id: 'CUST002', name: 'Bob Johnson' },
    dealership: { id: 'DEAL002', name: 'Hendrick Honda' },
    workflowStage: 'Underwriting',
    milestones: [
      { name: 'Contract Initiated', date: '2023-01-28', status: 'COMPLETED' },
      { name: 'Underwriting Approved', date: null, status: 'PENDING' },
      { name: 'Contract Signed', date: null, status: 'PENDING' },
    ],
    slaStatus: 'ON_TRACK',
    documents: [{ name: 'Pre-Approval Letter', url: '/dummy-pre-approval.pdf' }],
    auditLogs: [
      { id: 'AL003', timestamp: '2023-01-28 02:00 PM', user: 'DealershipUser', action: 'Contract VSC-2023-0002 initiated' },
    ]
  },
  {
    id: 'VSC003',
    contractNumber: 'VSC-2023-0003',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150',
    vehicleVIN: '1FTFW1ET333345678',
    planType: 'Silver',
    startDate: '2023-03-01',
    endDate: '2027-03-01',
    premiumAmount: 1200,
    status: 'REJECTED',
    customer: { id: 'CUST003', name: 'Charlie Brown' },
    dealership: { id: 'DEAL001', name: 'AutoNation Dallas' },
    workflowStage: 'Underwriting',
    milestones: [
      { name: 'Contract Initiated', date: '2023-02-25', status: 'COMPLETED' },
      { name: 'Underwriting Approved', date: null, status: 'REJECTED' },
      { name: 'Contract Signed', date: null, status: 'PENDING' },
    ],
    slaStatus: 'BREACHED',
    documents: [],
    auditLogs: [
      { id: 'AL004', timestamp: '2023-02-25 09:00 AM', user: 'DealershipUser', action: 'Contract VSC-2023-0003 created' },
      { id: 'AL005', timestamp: '2023-02-28 04:00 PM', user: 'Underwriter', action: 'Contract VSC-2023-0003 rejected: insufficient coverage' },
    ]
  },
  {
    id: 'VSC004',
    contractNumber: 'VSC-2023-0004',
    vehicleMake: 'Tesla',
    vehicleModel: 'Model 3',
    vehicleVIN: '5YJ3E1EA944445678',
    planType: 'Platinum EV',
    startDate: '2023-04-01',
    endDate: '2029-04-01',
    premiumAmount: 3500,
    status: 'APPROVED',
    customer: { id: 'CUST004', name: 'Diana Prince' },
    dealership: { id: 'DEAL003', name: 'EV Motors Inc.' },
    workflowStage: 'Approval',
    milestones: [
      { name: 'Contract Initiated', date: '2023-03-20', status: 'COMPLETED' },
      { name: 'Underwriting Approved', date: '2023-03-25', status: 'COMPLETED' },
      { name: 'Contract Signed', date: null, status: 'PENDING' },
    ],
    slaStatus: 'ON_TRACK',
    documents: [],
    auditLogs: [
      { id: 'AL006', timestamp: '2023-03-20 10:00 AM', user: 'DealershipUser', action: 'Contract VSC-2023-0004 initiated' },
      { id: 'AL007', timestamp: '2023-03-25 10:00 AM', user: 'Underwriter', action: 'Contract VSC-2023-0004 approved' },
    ]
  },
  {
    id: 'VSC005',
    contractNumber: 'VSC-2023-0005',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    vehicleVIN: 'WBAJX7C5X55555678',
    planType: 'Gold',
    startDate: '2022-10-01',
    endDate: '2027-10-01',
    premiumAmount: 2200,
    status: 'EXPIRED',
    customer: { id: 'CUST005', name: 'Eve Adams' },
    dealership: { id: 'DEAL002', name: 'Hendrick Honda' }, // Mismatch for demo
    workflowStage: 'Expired',
    milestones: [
      { name: 'Contract Initiated', date: '2022-09-20', status: 'COMPLETED' },
      { name: 'Underwriting Approved', date: '2022-09-25', status: 'COMPLETED' },
      { name: 'Contract Signed', date: '2022-10-01', status: 'COMPLETED' },
      { name: 'Service Period', date: '2027-10-01', status: 'COMPLETED' },
      { name: 'Expired', date: '2027-10-01', status: 'COMPLETED' },
    ],
    slaStatus: 'COMPLETED',
    documents: [],
    auditLogs: [
      { id: 'AL008', timestamp: '2022-09-20 01:00 PM', user: 'DealershipUser', action: 'Contract VSC-2023-0005 initiated' },
      { id: 'AL009', timestamp: '2027-10-01 12:00 AM', user: 'System', action: 'Contract VSC-2023-0005 expired' },
    ]
  },
];

const DUMMY_CLAIMS = [
  {
    id: 'CLM001',
    claimNumber: 'CLM-VSC001-001',
    contractId: 'VSC001',
    claimDate: '2024-03-10',
    description: 'Engine malfunction, check engine light on.',
    status: 'SUBMITTED',
    amountRequested: 1200,
    amountApproved: null,
    fraudScore: 0.1,
    documents: [{ name: 'Repair Estimate', url: '/dummy-repair-estimate.pdf' }],
    auditLogs: [
      { id: 'CLA001', timestamp: '2024-03-10 09:00 AM', user: 'CustomerServiceRep', action: 'Claim CLM-VSC001-001 submitted for VSC001' },
    ]
  },
  {
    id: 'CLM002',
    claimNumber: 'CLM-VSC001-002',
    contractId: 'VSC001',
    claimDate: '2024-02-20',
    description: 'Brake pad replacement required.',
    status: 'ADJUDICATED',
    amountRequested: 450,
    amountApproved: 400,
    fraudScore: 0.05,
    documents: [{ name: 'Invoice', url: '/dummy-invoice.pdf' }],
    auditLogs: [
      { id: 'CLA002', timestamp: '2024-02-20 10:00 AM', user: 'VehicleOwner', action: 'Claim CLM-VSC001-002 submitted for VSC001' },
      { id: 'CLA003', timestamp: '2024-02-22 01:00 PM', user: 'ClaimsAdjuster', action: 'Claim CLM-VSC001-002 adjudicated, $400 approved' },
    ]
  },
  {
    id: 'CLM003',
    claimNumber: 'CLM-VSC002-001',
    contractId: 'VSC002',
    claimDate: '2024-01-05',
    description: 'AC system not cooling properly.',
    status: 'REJECTED',
    amountRequested: 900,
    amountApproved: null,
    fraudScore: 0.85,
    documents: [],
    auditLogs: [
      { id: 'CLA004', timestamp: '2024-01-05 11:00 AM', user: 'DealershipPortalUser', action: 'Claim CLM-VSC002-001 submitted for VSC002' },
      { id: 'CLA005', timestamp: '2024-01-08 03:00 PM', user: 'ClaimsAdjuster', action: 'Claim CLM-VSC002-001 rejected due to fraud detection' },
    ]
  },
  {
    id: 'CLM004',
    claimNumber: 'CLM-VSC004-001',
    contractId: 'VSC004',
    claimDate: '2024-04-15',
    description: 'Battery diagnostics needed.',
    status: 'REVIEWING',
    amountRequested: 200,
    amountApproved: null,
    fraudScore: 0.15,
    documents: [],
    auditLogs: [
      { id: 'CLA006', timestamp: '2024-04-15 09:30 AM', user: 'VehicleOwner', action: 'Claim CLM-VSC004-001 submitted for VSC004' },
    ]
  }
];

const DUMMY_ACTIVITIES = [
  { id: 'ACT001', type: 'Contract Created', description: 'VSC-2023-0001 for Alice Smith', date: '2024-04-20 10:00 AM', user: 'DealershipAdmin', relatedEntity: 'VSC001' },
  { id: 'ACT002', type: 'Claim Submitted', description: 'CLM-VSC001-001 for engine malfunction', date: '2024-04-19 03:30 PM', user: 'CustomerServiceRep', relatedEntity: 'CLM001' },
  { id: 'ACT003', type: 'Contract Approved', description: 'VSC-2023-0004 for Diana Prince', date: '2024-04-18 11:45 AM', user: 'Underwriter', relatedEntity: 'VSC004' },
  { id: 'ACT004', type: 'Claim Adjudicated', description: 'CLM-VSC001-002 for brake replacement (Paid $400)', date: '2024-04-17 09:15 AM', user: 'ClaimsAdjuster', relatedEntity: 'CLM002' },
  { id: 'ACT005', type: 'Contract Rejected', description: 'VSC-2023-0003 for Charlie Brown', date: '2024-04-16 02:00 PM', user: 'Underwriter', relatedEntity: 'VSC003' },
  { id: 'ACT006', type: 'Claim Submitted', description: 'CLM-VSC004-001 for battery diagnostics', date: '2024-04-15 09:30 AM', user: 'VehicleOwner', relatedEntity: 'CLM004' },
];

const STATUS_MAPPING = {
  ACTIVE: { label: 'Active', className: 'status-ACTIVE' },
  APPROVED: { label: 'Approved', className: 'status-APPROVED' },
  UNDER_REVIEW: { label: 'Under Review', className: 'status-UNDER_REVIEW' },
  REVIEWING: { label: 'Reviewing', className: 'status-REVIEWING' },
  REJECTED: { label: 'Rejected', className: 'status-REJECTED' },
  CANCELLED: { label: 'Cancelled', className: 'status-CANCELLED' },
  EXPIRED: { label: 'Expired', className: 'status-EXPIRED' },
  SUBMITTED: { label: 'Submitted', className: 'status-SUBMITTED' },
  ADJUDICATED: { label: 'Adjudicated', className: 'status-ADJUDICATED' },
  PAID: { label: 'Paid', className: 'status-PAID' },
  ON_TRACK: { label: 'On Track', className: 'status-ON_TRACK' },
  BREACHED: { label: 'Breached', className: 'status-BREACHED' },
  COMPLETED: { label: 'Completed', className: 'status-COMPLETED' },
  PENDING: { label: 'Pending', className: 'status-UNDER_REVIEW' }, // Using under_review color for pending
};

const ROLES = {
  FN_PRODUCT_MANAGER: 'F&I Product Manager',
  CUSTOMER_SERVICE_REP: 'Customer Service Representative',
  DEALERSHIP_USER: 'Dealership Portal User',
  VEHICLE_OWNER: 'Vehicle Owner',
  SYSTEM_ARCHITECT: 'System Architect', // Less UI interaction, but included for completeness
};

const ROLE_PERMISSIONS = {
  [ROLES.FN_PRODUCT_MANAGER]: { canViewDashboard: true, canManageContracts: true, canManageClaims: true, canViewAuditLogs: true, canEditForms: true },
  [ROLES.CUSTOMER_SERVICE_REP]: { canViewDashboard: true, canManageContracts: true, canManageClaims: true, canViewAuditLogs: false, canEditForms: true },
  [ROLES.DEALERSHIP_USER]: { canViewDashboard: true, canManageContracts: true, canManageClaims: true, canViewAuditLogs: true, canEditForms: true },
  [ROLES.VEHICLE_OWNER]: { canViewDashboard: false, canManageContracts: false, canManageClaims: true, canViewAuditLogs: false, canEditForms: false }, // Can only view/submit their own claims/contracts
  [ROLES.SYSTEM_ARCHITECT]: { canViewDashboard: true, canManageContracts: false, canManageClaims: false, canViewAuditLogs: true, canEditForms: false },
};

const App = () => {
  const [view, setView] = useState({ screen: 'DASHBOARD', params: {} });
  const [currentUserRole, setCurrentUserRole] = useState(ROLES.FN_PRODUCT_MANAGER); // Default role for demo
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false); // For side panel filters

  const navigate = (screen, params = {}) => {
    setView({ screen, params });
    setShowFilters(false); // Close filters on navigation
  };

  const handleLogout = () => {
    // In a real app, this would clear session, redirect to login
    setCurrentUserRole(ROLES.VEHICLE_OWNER); // Example: switch to a different role on "logout"
    navigate('DASHBOARD');
  };

  const Breadcrumbs = ({ currentScreen, screenParams }) => {
    const path = [{ label: 'Home', screen: 'DASHBOARD' }];

    if (currentScreen === 'DASHBOARD') {
      path.push({ label: 'Dashboard', screen: 'DASHBOARD', active: true });
    } else if (currentScreen === 'VSC_LIST' || currentScreen === 'CREATE_CONTRACT') {
      path.push({ label: 'Contracts', screen: 'VSC_LIST', active: currentScreen === 'VSC_LIST' });
      if (currentScreen === 'CREATE_CONTRACT') path.push({ label: 'Create New', screen: 'CREATE_CONTRACT', active: true });
    } else if (currentScreen === 'VSC_DETAIL' || currentScreen === 'EDIT_CONTRACT') {
      path.push({ label: 'Contracts', screen: 'VSC_LIST' });
      path.push({ label: screenParams.contractNumber, screen: 'VSC_DETAIL', params: { id: screenParams.id }, active: currentScreen === 'VSC_DETAIL' });
      if (currentScreen === 'EDIT_CONTRACT') path.push({ label: 'Edit', screen: 'EDIT_CONTRACT', active: true });
    } else if (currentScreen === 'CLAIM_LIST') {
      path.push({ label: 'Claims', screen: 'CLAIM_LIST', active: true });
    } else if (currentScreen === 'CLAIM_DETAIL') {
      path.push({ label: 'Claims', screen: 'CLAIM_LIST' });
      path.push({ label: screenParams.claimNumber, screen: 'CLAIM_DETAIL', params: { id: screenParams.id }, active: true });
    }

    return (
      <nav className="breadcrumbs" aria-label="breadcrumb">
        <ol style={{ display: 'flex', listStyle: 'none', margin: '0', padding: '0' }}>
          {path.map((item, index) => (
            <li key={item.label} className={`breadcrumb-item ${item.active ? 'active' : ''}`}>
              {(item.screen && !item.active) ? (
                <a href="#" onClick={() => navigate(item.screen, item.params)}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  };

  // --- Components for Screens ---

  const Header = ({ onSearchChange, searchTerm, currentUserRole, onLogout, navigate }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};

    return (
      <header className="header">
        <div className="header-left">
          <span className="logo">VSC App</span>
          <nav className="nav-menu">
            {(permissions.canViewDashboard) && (
              <a href="#" className={`nav-item ${(view.screen === 'DASHBOARD') ? 'active' : ''}`} onClick={() => navigate('DASHBOARD')}>Dashboard</a>
            )}
            {(permissions.canManageContracts) && (
              <a href="#" className={`nav-item ${(view.screen.startsWith('VSC')) ? 'active' : ''}`} onClick={() => navigate('VSC_LIST')}>Contracts</a>
            )}
            {(permissions.canManageClaims) && (
              <a href="#" className={`nav-item ${(view.screen.startsWith('CLAIM')) ? 'active' : ''}`} onClick={() => navigate('CLAIM_LIST')}>Claims</a>
            )}
          </nav>
        </div>
        <div className="header-right">
          <div className="global-search-container">
            <input
              type="text"
              placeholder="Global Search..."
              className="global-search-input"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <span className="text-secondary" style={{ marginRight: 'var(--spacing-md)' }}>{currentUserRole}</span>
          <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>
    );
  };

  const Dashboard = ({ navigate, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(permissions.canViewDashboard)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view the dashboard.</p>
        </div>
      );
    }

    const totalContracts = DUMMY_CONTRACTS.length;
    const activeContracts = DUMMY_CONTRACTS.filter(c => c.status === 'ACTIVE').length;
    const pendingClaims = DUMMY_CLAIMS.filter(c => c.status === 'SUBMITTED' || c.status === 'REVIEWING').length;
    const approvedClaims = DUMMY_CLAIMS.filter(c => c.status === 'ADJUDICATED' || c.status === 'PAID').length;

    return (
      <div className="main-content">
        <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Dashboard</h1>

        <div className="dashboard-grid">
          <div className="kpi-card">
            <h3>Total Contracts</h3>
            <div className="value">{totalContracts}</div>
          </div>
          <div className="kpi-card">
            <h3>Active Contracts</h3>
            <div className="value">{activeContracts}</div>
          </div>
          <div className="kpi-card">
            <h3>Pending Claims</h3>
            <div className="value">{pendingClaims}</div>
          </div>
          <div className="kpi-card">
            <h3>Approved Claims</h3>
            <div className="value">{approvedClaims}</div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container">Bar Chart Placeholder</div>
          <div className="chart-container">Line Chart Placeholder</div>
          <div className="chart-container">Donut Chart Placeholder</div>
          <div className="chart-container">Gauge Chart Placeholder</div>
        </div>

        <div className="recent-activities-panel">
          <h3>Recent Activities</h3>
          <div className="related-list">
            {DUMMY_ACTIVITIES.map(activity => (
              <div key={activity.id} className="activity-item">
                <span className="activity-icon">&#9679;</span> {/* Placeholder for icon */}
                <p className="activity-text">
                  <strong>{activity.user}</strong> {activity.description}
                </p>
                <span className="activity-date">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ContractCard = ({ contract, onClick }) => {
    const statusInfo = STATUS_MAPPING[contract.status] || { label: contract.status, className: '' };
    return (
      <div className="card" onClick={onClick}>
        <div className="card-header">
          <span>{contract.contractNumber}</span>
          <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>
        </div>
        <div className="card-body">
          <p><strong>Vehicle:</strong> {contract.vehicleMake} {contract.vehicleModel} ({contract.vehicleVIN})</p>
          <p><strong>Plan:</strong> {contract.planType}</p>
          <p><strong>Customer:</strong> {contract.customer?.name}</p>
          <p><strong>Dealership:</strong> {contract.dealership?.name}</p>
        </div>
        <div className="card-footer">
          <span>Starts: {contract.startDate}</span>
          <span>Ends: {contract.endDate}</span>
        </div>
      </div>
    );
  };

  const VSCList = ({ navigate, globalSearchTerm, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(permissions.canManageContracts)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view contracts.</p>
          <button className="btn btn-primary" onClick={() => navigate('DASHBOARD')}>Back to Dashboard</button>
        </div>
      );
    }

    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('contractNumber');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    const handleFilterChange = (e) => setFilterStatus(e.target.value);
    const handleSortChange = (field) => {
      if (sortBy === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(field);
        setSortOrder('asc');
      }
    };

    const filteredAndSortedContracts = DUMMY_CONTRACTS
      .filter(contract =>
        (globalSearchTerm === '' ||
          contract.contractNumber.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          contract.vehicleVIN.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          contract.customer?.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          contract.dealership?.name.toLowerCase().includes(globalSearchTerm.toLowerCase())) &&
        (filterStatus === '' || contract.status === filterStatus)
      )
      .sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

    return (
      <div className="main-content">
        <div className="detail-header">
          <h1>Vehicle Service Contracts</h1>
          <div className="flex-row gap-md">
            {(permissions.canEditForms) && (
              <button className="btn btn-primary" onClick={() => navigate('CREATE_CONTRACT')}>Create New Contract</button>
            )}
            <button className="btn btn-outline-primary" onClick={() => setShowFilters(true)}>Filters</button>
            <button className="btn btn-outline-primary">Export</button>
          </div>
        </div>

        {(showFilters) && (
          <div className="filter-panel" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3>Filters</h3>
            <div className="form-group">
              <label htmlFor="filterStatus">Status</label>
              <select id="filterStatus" className="select-field" value={filterStatus} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                {Object.keys(STATUS_MAPPING).map(statusKey => (
                  <option key={statusKey} value={statusKey}>{STATUS_MAPPING[statusKey].label}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setFilterStatus(''); setShowFilters(false); }}>Clear Filters</button>
              <button type="button" className="btn btn-primary" onClick={() => setShowFilters(false)}>Apply Filters</button>
            </div>
          </div>
        )}

        <div className="flex-row gap-md mb-md">
          <span>Sort By: </span>
          {['contractNumber', 'status', 'startDate'].map(field => (
            <button
              key={field}
              className={`btn btn-outline-primary btn-sm ${sortBy === field ? 'active' : ''}`}
              onClick={() => handleSortChange(field)}
              style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-size-sm)' }}
            >
              {field} {sortBy === field && (sortOrder === 'asc' ? String.fromCharCode(9650) : String.fromCharCode(9660))}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {filteredAndSortedContracts.map(contract => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onClick={() => navigate('VSC_DETAIL', { id: contract.id, contractNumber: contract.contractNumber })}
            />
          ))}
        </div>
      </div>
    );
  };

  const VSCDetail = ({ contract, navigate, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(contract) || !(permissions.canManageContracts)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Contract Not Found or Access Denied</h2>
          <p>{!(contract) ? 'The requested contract does not exist.' : 'You do not have permission to view this contract.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('VSC_LIST')}>Back to Contracts</button>
        </div>
      );
    }

    const workflowStages = [
      { name: 'Initiation', key: 'Initiation' },
      { name: 'Underwriting', key: 'Underwriting' },
      { name: 'Approval', key: 'Approval' },
      { name: 'Active', key: 'Active' },
      { name: 'Service Period', key: 'Service Period' },
      { name: 'Renewal/Expiration', key: 'Renewal/Expiration' }
    ];

    const relatedClaims = DUMMY_CLAIMS.filter(claim => claim.contractId === contract.id);

    return (
      <div className="main-content">
        <div className="detail-header">
          <h1>Contract: {contract.contractNumber}</h1>
          <div className="flex-row gap-md">
            {(permissions.canEditForms) && (
              <button className="btn btn-primary" onClick={() => navigate('EDIT_CONTRACT', { id: contract.id, contractNumber: contract.contractNumber })}>Edit Contract</button>
            )}
            {/* Quick Actions (Hover on web for cards, but here for detail) */}
            <button className="btn btn-outline-primary">Renew</button>
            <button className="btn btn-danger">Cancel</button>
          </div>
        </div>

        <div className="detail-section">
          <h3>Workflow Status</h3>
          <div className="workflow-tracker">
            {workflowStages.map(stage => (
              <div
                key={stage.key}
                className={`workflow-stage ${(contract.workflowStage === stage.key) ? 'active' : ''} ${(contract.milestones.some(m => m.name.includes(stage.key) && m.status === 'COMPLETED')) ? 'completed' : ''}`}
              >
                <h4>{stage.name}</h4>
                {(contract.workflowStage === stage.key) && (
                  <span className={`sla-status ${contract.slaStatus}`}>{contract.slaStatus.replace('_', ' ')}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Contract Details</h3>
          <div className="detail-info-grid">
            <div className="detail-info-item"><strong>Status</strong> <span className={`status-badge ${STATUS_MAPPING[contract.status]?.className}`}>{STATUS_MAPPING[contract.status]?.label}</span></div>
            <div className="detail-info-item"><strong>Vehicle</strong> <span>{contract.vehicleMake} {contract.vehicleModel}</span></div>
            <div className="detail-info-item"><strong>VIN</strong> <span>{contract.vehicleVIN}</span></div>
            <div className="detail-info-item"><strong>Plan Type</strong> <span>{contract.planType}</span></div>
            <div className="detail-info-item"><strong>Start Date</strong> <span>{contract.startDate}</span></div>
            <div className="detail-info-item"><strong>End Date</strong> <span>{contract.endDate}</span></div>
            <div className="detail-info-item"><strong>Premium Amount</strong> <span>${contract.premiumAmount?.toLocaleString()}</span></div>
            <div className="detail-info-item"><strong>Customer</strong> <span>{contract.customer?.name} (ID: {contract.customer?.id})</span></div>
            <div className="detail-info-item"><strong>Dealership</strong> <span>{contract.dealership?.name} (ID: {contract.dealership?.id})</span></div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Milestones</h3>
          <div className="related-list">
            {contract.milestones.map((milestone, index) => (
              <div key={index} className="related-item justify-between">
                <span>{milestone.name}</span>
                <span className={`status-badge status-${milestone.status}`}>{milestone.status?.replace('_', ' ')} {(milestone.date) ? `(${milestone.date})` : ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Related Claims ({relatedClaims.length})</h3>
          <div className="related-list">
            {(relatedClaims.length > 0) ? (
              relatedClaims.map(claim => (
                <div key={claim.id} className="related-item" onClick={() => navigate('CLAIM_DETAIL', { id: claim.id, claimNumber: claim.claimNumber })}>
                  <span>Claim {claim.claimNumber} - {claim.description}</span>
                  <span className={`status-badge ${STATUS_MAPPING[claim.status]?.className}`}>{STATUS_MAPPING[claim.status]?.label}</span>
                </div>
              ))
            ) : (
              <p className="text-secondary text-center">No claims for this contract.</p>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h3>Documents ({contract.documents?.length || 0})</h3>
          <div className="related-list">
            {(contract.documents?.length > 0) ? (
              contract.documents.map(doc => (
                <div key={doc.name} className="related-item">
                  <span>{doc.name}</span>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary" style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}>Preview</a>
                </div>
              ))
            ) : (
              <p className="text-secondary text-center">No documents uploaded.</p>
            )}
          </div>
          {(contract.documents?.length > 0) && (
            <div className="document-preview-container">
              <span>Document Preview Placeholder for: {contract.documents[0]?.name}</span>
              {/* <iframe src={contract.documents[0].url} width="100%" height="100%" title="Document Preview"></iframe> */}
            </div>
          )}
        </div>

        {(permissions.canViewAuditLogs) && (
          <div className="detail-section">
            <h3>Audit Log</h3>
            <div className="related-list">
              {contract.auditLogs?.map(log => (
                <div key={log.id} className="audit-log-item">
                  <span><strong>{log.timestamp}</strong> - {log.action}</span>
                  <span>by <strong>{log.user}</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  };

  const ClaimCard = ({ claim, onClick }) => {
    const contract = DUMMY_CONTRACTS.find(c => c.id === claim.contractId);
    const statusInfo = STATUS_MAPPING[claim.status] || { label: claim.status, className: '' };
    return (
      <div className="card" onClick={onClick}>
        <div className="card-header">
          <span>Claim: {claim.claimNumber}</span>
          <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>
        </div>
        <div className="card-body">
          <p><strong>Contract:</strong> {contract?.contractNumber}</p>
          <p><strong>Description:</strong> {claim.description}</p>
          <p><strong>Requested:</strong> ${claim.amountRequested?.toLocaleString()}</p>
          {(claim.amountApproved !== null) && <p><strong>Approved:</strong> ${claim.amountApproved?.toLocaleString()}</p>}
        </div>
        <div className="card-footer">
          <span>Claim Date: {claim.claimDate}</span>
          <span>Fraud Score: {claim.fraudScore}</span>
        </div>
      </div>
    );
  };

  const ClaimList = ({ navigate, globalSearchTerm, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(permissions.canManageClaims)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view claims.</p>
          <button className="btn btn-primary" onClick={() => navigate('DASHBOARD')}>Back to Dashboard</button>
        </div>
      );
    }

    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('claimDate');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleFilterChange = (e) => setFilterStatus(e.target.value);
    const handleSortChange = (field) => {
      if (sortBy === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(field);
        setSortOrder('asc');
      }
    };

    const filteredAndSortedClaims = DUMMY_CLAIMS
      .filter(claim =>
        (globalSearchTerm === '' ||
          claim.claimNumber.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          claim.description.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          DUMMY_CONTRACTS.find(c => c.id === claim.contractId)?.contractNumber.toLowerCase().includes(globalSearchTerm.toLowerCase())) &&
        (filterStatus === '' || claim.status === filterStatus)
      )
      .sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

    return (
      <div className="main-content">
        <div className="detail-header">
          <h1>Vehicle Service Claims</h1>
          <div className="flex-row gap-md">
            {(permissions.canEditForms) && (
              <button className="btn btn-primary" onClick={() => navigate('CREATE_CLAIM')}>Create New Claim</button>
            )}
            <button className="btn btn-outline-primary" onClick={() => setShowFilters(true)}>Filters</button>
            <button className="btn btn-outline-primary">Export</button>
          </div>
        </div>

        {(showFilters) && (
          <div className="filter-panel" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3>Filters</h3>
            <div className="form-group">
              <label htmlFor="filterStatus">Status</label>
              <select id="filterStatus" className="select-field" value={filterStatus} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                {Object.keys(STATUS_MAPPING).filter(s => ['SUBMITTED', 'REVIEWING', 'ADJUDICATED', 'REJECTED', 'PAID'].includes(s)).map(statusKey => (
                  <option key={statusKey} value={statusKey}>{STATUS_MAPPING[statusKey].label}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setFilterStatus(''); setShowFilters(false); }}>Clear Filters</button>
              <button type="button" className="btn btn-primary" onClick={() => setShowFilters(false)}>Apply Filters</button>
            </div>
          </div>
        )}

        <div className="flex-row gap-md mb-md">
          <span>Sort By: </span>
          {['claimDate', 'status', 'amountRequested'].map(field => (
            <button
              key={field}
              className={`btn btn-outline-primary btn-sm ${sortBy === field ? 'active' : ''}`}
              onClick={() => handleSortChange(field)}
              style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-size-sm)' }}
            >
              {field} {sortBy === field && (sortOrder === 'asc' ? String.fromCharCode(9650) : String.fromCharCode(9660))}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {filteredAndSortedClaims.map(claim => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              onClick={() => navigate('CLAIM_DETAIL', { id: claim.id, claimNumber: claim.claimNumber })}
            />
          ))}
        </div>
      </div>
    );
  };

  const ClaimDetail = ({ claim, navigate, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(claim) || !(permissions.canManageClaims)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Claim Not Found or Access Denied</h2>
          <p>{!(claim) ? 'The requested claim does not exist.' : 'You do not have permission to view this claim.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('CLAIM_LIST')}>Back to Claims</button>
        </div>
      );
    }

    const contract = DUMMY_CONTRACTS.find(c => c.id === claim.contractId);

    const handleApproveClaim = () => {
      // Logic to update claim status to 'ADJUDICATED' / 'PAID'
      alert(`Claim ${claim.claimNumber} approved/paid logic here.`);
      // In a real app, you'd update state or call an API, then potentially navigate.
      // For this demo, just alert.
    };

    const handleRejectClaim = () => {
      // Logic to update claim status to 'REJECTED'
      alert(`Claim ${claim.claimNumber} rejected logic here.`);
    };

    return (
      <div className="main-content">
        <div className="detail-header">
          <h1>Claim: {claim.claimNumber}</h1>
          <div className="flex-row gap-md">
            {((permissions.canEditForms) && claim.status !== 'ADJUDICATED' && claim.status !== 'REJECTED') && (
              <>
                <button className="btn btn-primary" onClick={handleApproveClaim}>Approve Claim</button>
                <button className="btn btn-danger" onClick={handleRejectClaim}>Reject Claim</button>
              </>
            )}
            <button className="btn btn-outline-primary" onClick={() => navigate('EDIT_CLAIM', { id: claim.id, claimNumber: claim.claimNumber })}>Edit Claim</button>
          </div>
        </div>

        <div className="detail-section">
          <h3>Claim Details</h3>
          <div className="detail-info-grid">
            <div className="detail-info-item"><strong>Status</strong> <span className={`status-badge ${STATUS_MAPPING[claim.status]?.className}`}>{STATUS_MAPPING[claim.status]?.label}</span></div>
            <div className="detail-info-item"><strong>Contract</strong> <a href="#" onClick={() => navigate('VSC_DETAIL', { id: contract?.id, contractNumber: contract?.contractNumber })}>{contract?.contractNumber}</a></div>
            <div className="detail-info-item"><strong>Vehicle</strong> <span>{contract?.vehicleMake} {contract?.vehicleModel} ({contract?.vehicleVIN})</span></div>
            <div className="detail-info-item"><strong>Claim Date</strong> <span>{claim.claimDate}</span></div>
            <div className="detail-info-item"><strong>Amount Requested</strong> <span>${claim.amountRequested?.toLocaleString()}</span></div>
            {(claim.amountApproved !== null) && <div className="detail-info-item"><strong>Amount Approved</strong> <span>${claim.amountApproved?.toLocaleString()}</span></div>}
            <div className="detail-info-item"><strong>Fraud Score</strong> <span>{claim.fraudScore}</span></div>
          </div>
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <strong>Description:</strong> <p>{claim.description}</p>
          </div>
        </div>

        <div className="detail-section">
          <h3>Documents ({claim.documents?.length || 0})</h3>
          <div className="related-list">
            {(claim.documents?.length > 0) ? (
              claim.documents.map(doc => (
                <div key={doc.name} className="related-item">
                  <span>{doc.name}</span>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary" style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}>Preview</a>
                </div>
              ))
            ) : (
              <p className="text-secondary text-center">No documents uploaded.</p>
            )}
          </div>
          {(claim.documents?.length > 0) && (
            <div className="document-preview-container">
              <span>Document Preview Placeholder for: {claim.documents[0]?.name}</span>
              {/* <iframe src={claim.documents[0].url} width="100%" height="100%" title="Document Preview"></iframe> */}
            </div>
          )}
        </div>

        {(permissions.canViewAuditLogs) && (
          <div className="detail-section">
            <h3>Audit Log</h3>
            <div className="related-list">
              {claim.auditLogs?.map(log => (
                <div key={log.id} className="audit-log-item">
                  <span><strong>{log.timestamp}</strong> - {log.action}</span>
                  <span>by <strong>{log.user}</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CreateContractForm = ({ navigate, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(permissions.canEditForms)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to create contracts.</p>
          <button className="btn btn-primary" onClick={() => navigate('VSC_LIST')}>Back to Contracts</button>
        </div>
      );
    }

    const [formData, setFormData] = useState({
      contractNumber: '', vehicleMake: '', vehicleModel: '', vehicleVIN: '',
      planType: '', startDate: '', endDate: '', premiumAmount: '',
      customerName: '', dealershipName: '', documents: []
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error for the field being edited
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleFileChange = (e) => {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        file: file, // Store the actual file object for potential upload
        url: URL.createObjectURL(file) // For client-side preview, if needed
      }));
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    };

    const handleRemoveFile = (fileName) => {
      setFormData(prev => ({
        ...prev,
        documents: prev.documents.filter(doc => doc.name !== fileName)
      }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!(formData.contractNumber)) newErrors.contractNumber = 'Contract Number is mandatory.';
      if (!(formData.vehicleVIN)) newErrors.vehicleVIN = 'Vehicle VIN is mandatory.';
      if (!(formData.planType)) newErrors.planType = 'Plan Type is mandatory.';
      if (!(formData.startDate)) newErrors.startDate = 'Start Date is mandatory.';
      if (!(formData.premiumAmount) || isNaN(formData.premiumAmount) || parseFloat(formData.premiumAmount) <= 0) newErrors.premiumAmount = 'Premium Amount must be a positive number.';
      if (!(formData.customerName)) newErrors.customerName = 'Customer Name is mandatory.';
      if (!(formData.dealershipName)) newErrors.dealershipName = 'Dealership Name is mandatory.';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Contract created successfully! (See console for data)');
        console.log('New Contract Data:', formData);
        // In a real app, send data to API, then navigate
        navigate('VSC_LIST');
      } else {
        alert('Please correct the form errors.');
      }
    };

    return (
      <div className="main-content">
        <h1>Create New Vehicle Service Contract</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="detail-info-grid"> {/* Using grid for form layout */}
            <div className="form-group">
              <label htmlFor="contractNumber">Contract Number (Mandatory)</label>
              <input type="text" id="contractNumber" name="contractNumber" className="input-field" value={formData.contractNumber} onChange={handleChange} required />
              {(errors.contractNumber) && <span className="text-danger">{errors.contractNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="vehicleMake">Vehicle Make</label>
              <input type="text" id="vehicleMake" name="vehicleMake" className="input-field" value={formData.vehicleMake} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleModel">Vehicle Model</label>
              <input type="text" id="vehicleModel" name="vehicleModel" className="input-field" value={formData.vehicleModel} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleVIN">Vehicle VIN (Mandatory)</label>
              <input type="text" id="vehicleVIN" name="vehicleVIN" className="input-field" value={formData.vehicleVIN} onChange={handleChange} required />
              {(errors.vehicleVIN) && <span className="text-danger">{errors.vehicleVIN}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="planType">Plan Type (Mandatory)</label>
              <select id="planType" name="planType" className="select-field" value={formData.planType} onChange={handleChange} required>
                <option value="">Select Plan</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum EV">Platinum EV</option>
              </select>
              {(errors.planType) && <span className="text-danger">{errors.planType}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date (Mandatory)</label>
              <input type="date" id="startDate" name="startDate" className="input-field" value={formData.startDate} onChange={handleChange} required />
              {(errors.startDate) && <span className="text-danger">{errors.startDate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date (Auto-populated for 5 years)</label>
              <input type="date" id="endDate" name="endDate" className="input-field" value={formData.endDate} onChange={handleChange} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="premiumAmount">Premium Amount (Mandatory)</label>
              <input type="number" id="premiumAmount" name="premiumAmount" className="input-field" value={formData.premiumAmount} onChange={handleChange} required />
              {(errors.premiumAmount) && <span className="text-danger">{errors.premiumAmount}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name (Mandatory)</label>
              <input type="text" id="customerName" name="customerName" className="input-field" value={formData.customerName} onChange={handleChange} required />
              {(errors.customerName) && <span className="text-danger">{errors.customerName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="dealershipName">Dealership Name (Mandatory)</label>
              <input type="text" id="dealershipName" name="dealershipName" className="input-field" value={formData.dealershipName} onChange={handleChange} required />
              {(errors.dealershipName) && <span className="text-danger">{errors.dealershipName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Documents (File Upload)</label>
            <div className="file-upload-area" onClick={() => document.getElementById('fileInput').click()}>
              Drag & drop files here or click to upload
              <input type="file" id="fileInput" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div className="uploaded-files">
              {formData.documents.map((doc, index) => (
                <div key={index} className="uploaded-files-item">
                  <span>{doc.name}</span>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveFile(doc.name)}>&#x2715;</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('VSC_LIST')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Contract</button>
          </div>
        </form>
      </div>
    );
  };

  const EditContractForm = ({ navigate, contract, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(contract) || !(permissions.canEditForms)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Contract Not Found or Access Denied</h2>
          <p>{!(contract) ? 'The requested contract does not exist.' : 'You do not have permission to edit this contract.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('VSC_LIST')}>Back to Contracts</button>
        </div>
      );
    }

    const [formData, setFormData] = useState({
      contractNumber: contract.contractNumber,
      vehicleMake: contract.vehicleMake,
      vehicleModel: contract.vehicleModel,
      vehicleVIN: contract.vehicleVIN,
      planType: contract.planType,
      startDate: contract.startDate,
      endDate: contract.endDate,
      premiumAmount: contract.premiumAmount,
      customerName: contract.customer?.name,
      dealershipName: contract.dealership?.name,
      documents: contract.documents || [] // Existing documents
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleFileChange = (e) => {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      }));
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    };

    const handleRemoveFile = (fileName) => {
      setFormData(prev => ({
        ...prev,
        documents: prev.documents.filter(doc => doc.name !== fileName)
      }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!(formData.contractNumber)) newErrors.contractNumber = 'Contract Number is mandatory.';
      if (!(formData.vehicleVIN)) newErrors.vehicleVIN = 'Vehicle VIN is mandatory.';
      if (!(formData.planType)) newErrors.planType = 'Plan Type is mandatory.';
      if (!(formData.startDate)) newErrors.startDate = 'Start Date is mandatory.';
      if (!(formData.premiumAmount) || isNaN(formData.premiumAmount) || parseFloat(formData.premiumAmount) <= 0) newErrors.premiumAmount = 'Premium Amount must be a positive number.';
      if (!(formData.customerName)) newErrors.customerName = 'Customer Name is mandatory.';
      if (!(formData.dealershipName)) newErrors.dealershipName = 'Dealership Name is mandatory.';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Contract updated successfully! (See console for updated data)');
        console.log('Updated Contract Data:', formData);
        // In a real app, send data to API, then navigate
        navigate('VSC_DETAIL', { id: contract.id, contractNumber: contract.contractNumber });
      } else {
        alert('Please correct the form errors.');
      }
    };

    return (
      <div className="main-content">
        <h1>Edit Vehicle Service Contract: {contract.contractNumber}</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="detail-info-grid">
            <div className="form-group">
              <label htmlFor="contractNumber">Contract Number (Mandatory)</label>
              <input type="text" id="contractNumber" name="contractNumber" className="input-field" value={formData.contractNumber} onChange={handleChange} required />
              {(errors.contractNumber) && <span className="text-danger">{errors.contractNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="vehicleMake">Vehicle Make</label>
              <input type="text" id="vehicleMake" name="vehicleMake" className="input-field" value={formData.vehicleMake} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleModel">Vehicle Model</label>
              <input type="text" id="vehicleModel" name="vehicleModel" className="input-field" value={formData.vehicleModel} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleVIN">Vehicle VIN (Mandatory)</label>
              <input type="text" id="vehicleVIN" name="vehicleVIN" className="input-field" value={formData.vehicleVIN} onChange={handleChange} required />
              {(errors.vehicleVIN) && <span className="text-danger">{errors.vehicleVIN}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="planType">Plan Type (Mandatory)</label>
              <select id="planType" name="planType" className="select-field" value={formData.planType} onChange={handleChange} required>
                <option value="">Select Plan</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum EV">Platinum EV</option>
              </select>
              {(errors.planType) && <span className="text-danger">{errors.planType}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date (Mandatory)</label>
              <input type="date" id="startDate" name="startDate" className="input-field" value={formData.startDate} onChange={handleChange} required />
              {(errors.startDate) && <span className="text-danger">{errors.startDate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date (Auto-populated for 5 years)</label>
              <input type="date" id="endDate" name="endDate" className="input-field" value={formData.endDate} onChange={handleChange} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="premiumAmount">Premium Amount (Mandatory)</label>
              <input type="number" id="premiumAmount" name="premiumAmount" className="input-field" value={formData.premiumAmount} onChange={handleChange} required />
              {(errors.premiumAmount) && <span className="text-danger">{errors.premiumAmount}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name (Mandatory)</label>
              <input type="text" id="customerName" name="customerName" className="input-field" value={formData.customerName} onChange={handleChange} required />
              {(errors.customerName) && <span className="text-danger">{errors.customerName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="dealershipName">Dealership Name (Mandatory)</label>
              <input type="text" id="dealershipName" name="dealershipName" className="input-field" value={formData.dealershipName} onChange={handleChange} required />
              {(errors.dealershipName) && <span className="text-danger">{errors.dealershipName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Documents (File Upload)</label>
            <div className="file-upload-area" onClick={() => document.getElementById('editFileInput').click()}>
              Drag & drop files here or click to upload
              <input type="file" id="editFileInput" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div className="uploaded-files">
              {formData.documents.map((doc, index) => (
                <div key={index} className="uploaded-files-item">
                  <span>{doc.name}</span>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveFile(doc.name)}>&#x2715;</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('VSC_DETAIL', { id: contract.id, contractNumber: contract.contractNumber })}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    );
  };

  const CreateClaimForm = ({ navigate, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(permissions.canEditForms)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to create claims.</p>
          <button className="btn btn-primary" onClick={() => navigate('CLAIM_LIST')}>Back to Claims</button>
        </div>
      );
    }

    const [formData, setFormData] = useState({
      contractId: '', claimDate: '', description: '', amountRequested: '', documents: []
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleFileChange = (e) => {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      }));
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    };

    const handleRemoveFile = (fileName) => {
      setFormData(prev => ({
        ...prev,
        documents: prev.documents.filter(doc => doc.name !== fileName)
      }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!(formData.contractId)) newErrors.contractId = 'Contract is mandatory.';
      if (!(formData.claimDate)) newErrors.claimDate = 'Claim Date is mandatory.';
      if (!(formData.description)) newErrors.description = 'Description is mandatory.';
      if (!(formData.amountRequested) || isNaN(formData.amountRequested) || parseFloat(formData.amountRequested) <= 0) newErrors.amountRequested = 'Amount Requested must be a positive number.';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Claim created successfully! (See console for data)');
        console.log('New Claim Data:', formData);
        navigate('CLAIM_LIST');
      } else {
        alert('Please correct the form errors.');
      }
    };

    return (
      <div className="main-content">
        <h1>Create New Vehicle Service Claim</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="detail-info-grid">
            <div className="form-group">
              <label htmlFor="contractId">Related Contract (Mandatory)</label>
              <select id="contractId" name="contractId" className="select-field" value={formData.contractId} onChange={handleChange} required>
                <option value="">Select a Contract</option>
                {DUMMY_CONTRACTS.map(contract => (
                  <option key={contract.id} value={contract.id}>{contract.contractNumber} ({contract.customer?.name})</option>
                ))}
              </select>
              {(errors.contractId) && <span className="text-danger">{errors.contractId}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="claimDate">Claim Date (Mandatory)</label>
              <input type="date" id="claimDate" name="claimDate" className="input-field" value={formData.claimDate} onChange={handleChange} required />
              {(errors.claimDate) && <span className="text-danger">{errors.claimDate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="amountRequested">Amount Requested (Mandatory)</label>
              <input type="number" id="amountRequested" name="amountRequested" className="input-field" value={formData.amountRequested} onChange={handleChange} required />
              {(errors.amountRequested) && <span className="text-danger">{errors.amountRequested}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (Mandatory)</label>
            <textarea id="description" name="description" className="textarea-field" value={formData.description} onChange={handleChange} required></textarea>
            {(errors.description) && <span className="text-danger">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Documents (File Upload)</label>
            <div className="file-upload-area" onClick={() => document.getElementById('claimFileInput').click()}>
              Drag & drop files here or click to upload
              <input type="file" id="claimFileInput" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div className="uploaded-files">
              {formData.documents.map((doc, index) => (
                <div key={index} className="uploaded-files-item">
                  <span>{doc.name}</span>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveFile(doc.name)}>&#x2715;</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('CLAIM_LIST')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Claim</button>
          </div>
        </form>
      </div>
    );
  };

  const EditClaimForm = ({ navigate, claim, currentUserRole }) => {
    const permissions = ROLE_PERMISSIONS[currentUserRole] || {};
    if (!(claim) || !(permissions.canEditForms)) {
      return (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>Claim Not Found or Access Denied</h2>
          <p>{!(claim) ? 'The requested claim does not exist.' : 'You do not have permission to edit this claim.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('CLAIM_LIST')}>Back to Claims</button>
        </div>
      );
    }

    const [formData, setFormData] = useState({
      contractId: claim.contractId, claimDate: claim.claimDate, description: claim.description,
      amountRequested: claim.amountRequested, documents: claim.documents || [],
      amountApproved: claim.amountApproved, status: claim.status
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    const handleFileChange = (e) => {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      }));
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    };

    const handleRemoveFile = (fileName) => {
      setFormData(prev => ({
        ...prev,
        documents: prev.documents.filter(doc => doc.name !== fileName)
      }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!(formData.contractId)) newErrors.contractId = 'Contract is mandatory.';
      if (!(formData.claimDate)) newErrors.claimDate = 'Claim Date is mandatory.';
      if (!(formData.description)) newErrors.description = 'Description is mandatory.';
      if (!(formData.amountRequested) || isNaN(formData.amountRequested) || parseFloat(formData.amountRequested) <= 0) newErrors.amountRequested = 'Amount Requested must be a positive number.';
      if (formData.amountApproved !== null && (isNaN(formData.amountApproved) || parseFloat(formData.amountApproved) < 0)) newErrors.amountApproved = 'Amount Approved must be a non-negative number.';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Claim updated successfully! (See console for updated data)');
        console.log('Updated Claim Data:', formData);
        navigate('CLAIM_DETAIL', { id: claim.id, claimNumber: claim.claimNumber });
      } else {
        alert('Please correct the form errors.');
      }
    };

    return (
      <div className="main-content">
        <h1>Edit Vehicle Service Claim: {claim.claimNumber}</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="detail-info-grid">
            <div className="form-group">
              <label htmlFor="contractId">Related Contract (Mandatory)</label>
              <select id="contractId" name="contractId" className="select-field" value={formData.contractId} onChange={handleChange} required>
                <option value="">Select a Contract</option>
                {DUMMY_CONTRACTS.map(contract => (
                  <option key={contract.id} value={contract.id}>{contract.contractNumber} ({contract.customer?.name})</option>
                ))}
              </select>
              {(errors.contractId) && <span className="text-danger">{errors.contractId}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="claimDate">Claim Date (Mandatory)</label>
              <input type="date" id="claimDate" name="claimDate" className="input-field" value={formData.claimDate} onChange={handleChange} required />
              {(errors.claimDate) && <span className="text-danger">{errors.claimDate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="amountRequested">Amount Requested (Mandatory)</label>
              <input type="number" id="amountRequested" name="amountRequested" className="input-field" value={formData.amountRequested} onChange={handleChange} required />
              {(errors.amountRequested) && <span className="text-danger">{errors.amountRequested}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="amountApproved">Amount Approved</label>
              <input type="number" id="amountApproved" name="amountApproved" className="input-field" value={formData.amountApproved || ''} onChange={handleChange} />
              {(errors.amountApproved) && <span className="text-danger">{errors.amountApproved}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="status">Claim Status</label>
              <select id="status" name="status" className="select-field" value={formData.status} onChange={handleChange}>
                {Object.keys(STATUS_MAPPING).filter(s => ['SUBMITTED', 'REVIEWING', 'ADJUDICATED', 'PAID', 'REJECTED'].includes(s)).map(statusKey => (
                  <option key={statusKey} value={statusKey}>{STATUS_MAPPING[statusKey].label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (Mandatory)</label>
            <textarea id="description" name="description" className="textarea-field" value={formData.description} onChange={handleChange} required></textarea>
            {(errors.description) && <span className="text-danger">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Documents (File Upload)</label>
            <div className="file-upload-area" onClick={() => document.getElementById('editClaimFileInput').click()}>
              Drag & drop files here or click to upload
              <input type="file" id="editClaimFileInput" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div className="uploaded-files">
              {formData.documents.map((doc, index) => (
                <div key={index} className="uploaded-files-item">
                  <span>{doc.name}</span>
                  <button type="button" className="remove-btn" onClick={() => handleRemoveFile(doc.name)}>&#x2715;</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('CLAIM_DETAIL', { id: claim.id, claimNumber: claim.claimNumber })}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    );
  };


  // Main App rendering logic
  let screenContent;
  switch (view.screen) {
    case 'DASHBOARD':
      screenContent = <Dashboard navigate={navigate} currentUserRole={currentUserRole} />;
      break;
    case 'VSC_LIST':
      screenContent = <VSCList navigate={navigate} globalSearchTerm={globalSearchTerm} currentUserRole={currentUserRole} />;
      break;
    case 'VSC_DETAIL':
      const selectedContract = DUMMY_CONTRACTS.find(c => c.id === view.params.id);
      screenContent = <VSCDetail contract={selectedContract} navigate={navigate} currentUserRole={currentUserRole} />;
      break;
    case 'CREATE_CONTRACT':
      screenContent = <CreateContractForm navigate={navigate} currentUserRole={currentUserRole} />;
      break;
    case 'EDIT_CONTRACT':
      const contractToEdit = DUMMY_CONTRACTS.find(c => c.id === view.params.id);
      screenContent = <EditContractForm navigate={navigate} contract={contractToEdit} currentUserRole={currentUserRole} />;
      break;
    case 'CLAIM_LIST':
      screenContent = <ClaimList navigate={navigate} globalSearchTerm={globalSearchTerm} currentUserRole={currentUserRole} />;
      break;
    case 'CLAIM_DETAIL':
      const selectedClaim = DUMMY_CLAIMS.find(c => c.id === view.params.id);
      screenContent = <ClaimDetail claim={selectedClaim} navigate={navigate} currentUserRole={currentUserRole} />;
      break;
    case 'CREATE_CLAIM':
      screenContent = <CreateClaimForm navigate={navigate} currentUserRole={currentUserRole} />;
      break;
    case 'EDIT_CLAIM':
      const claimToEdit = DUMMY_CLAIMS.find(c => c.id === view.params.id);
      screenContent = <EditClaimForm navigate={navigate} claim={claimToEdit} currentUserRole={currentUserRole} />;
      break;
    default:
      screenContent = (
        <div className="main-content text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <h2>404 - Screen Not Found</h2>
          <p>The requested screen does not exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('DASHBOARD')}>Go to Dashboard</button>
        </div>
      );
  }

  return (
    <div className="app-container">
      <Header
        onSearchChange={setGlobalSearchTerm}
        searchTerm={globalSearchTerm}
        currentUserRole={currentUserRole}
        onLogout={handleLogout}
        navigate={navigate}
      />
      <Breadcrumbs currentScreen={view.screen} screenParams={view.params} />
      {screenContent}
    </div>
  );
};

export default App;