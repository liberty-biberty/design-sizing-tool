function FlowSelector({ onSelectFlow }) {
  return (
    <div className="flow-selector">
      <h2>What would you like to size?</h2>
      <div className="flow-cards">
        <button 
          className="flow-card"
          onClick={() => onSelectFlow('epic')}
        >
          <div className="flow-icon">📊</div>
          <h3>Epic</h3>
          <p>Size a large body of work using T-shirt sizes (XS-XXL)</p>
          <span className="flow-meta">For Design Managers</span>
        </button>
        
        <button 
          className="flow-card"
          onClick={() => onSelectFlow('story')}
        >
          <div className="flow-icon">📝</div>
          <h3>Story</h3>
          <p>Estimate story points for sprint planning (1-13)</p>
          <span className="flow-meta">For Design ICs</span>
        </button>
      </div>
    </div>
  )
}

export default FlowSelector