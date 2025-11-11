import { useState } from 'react'

const epicSizeData = {
  'XS': {
    sprints: '~1 Sprint',
    scope: 'Very Low: A minor enhancement. 1 simple user flow. Uses 100% existing design components.',
    uncertainty: 'None: The problem and solution are crystal clear. No new research or usability testing is needed.',
    dependency: 'Low: Can be handled by 1 designer. Minimal alignment needed with PM/Eng.'
  },
  'S': {
    sprints: '1-2 Sprints',
    scope: 'Low: A small, well-defined feature. 1-2 new, straightforward user flows. Mostly existing components, maybe 1-2 new simple ones.',
    uncertainty: 'Low: Requirements are clear. May involve one round of usability testing on a clear prototype.',
    dependency: 'Low: Contained to one designer. Standard alignment with PM/Eng.'
  },
  'M': {
    sprints: '3-4 Sprints (About half a quarter)',
    scope: 'Medium: A standard, net-new feature. 2-4 user flows of average complexity. Requires some new components for the design system.',
    uncertainty: 'Medium: We understand the problem, but the solution needs discovery. Requires generative research or multiple rounds of usability testing.',
    dependency: 'Medium: Needs alignment across multiple designers or teams. Requires regular check-ins.'
  },
  'L': {
    sprints: '5-6 Sprints (A full quarter)',
    scope: 'High: A large, complex new feature or product area. 5+ complex or interconnected user flows. Requires many new, complex components.',
    uncertainty: 'High: The problem space is ambiguous. Requires significant discovery, research, and testing to define the solution.',
    dependency: 'High: High-touch collaboration. Requires dedicated alignment with multiple Eng teams, Legal, Marketing, etc.'
  },
  'XL': {
    sprints: '6+ Sprints (Multiple quarters)',
    scope: 'Very High: A massive, foundational project. A complete redesign of a core product area. A new product from 0 to 1.',
    uncertainty: 'Very High: High ambiguity in a new domain. Requires foundational research just to define the problem and strategy.',
    dependency: 'Critical: Involves the entire team or company. Requires senior leadership buy-in and steering committees.'
  }
}

function EpicSizing({ onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendation, setRecommendation] = useState(null)

  const questions = [
    {
      id: 'scope',
      question: 'How would you describe the scope and complexity of this Epic?',
      options: [
        { value: 1, label: 'Very Low - Minor enhancement, 1 simple user flow, existing components only' },
        { value: 2, label: 'Low - Small feature, 1-2 straightforward flows, mostly existing components' },
        { value: 3, label: 'Medium - Standard new feature, 2-4 flows, some new components needed' },
        { value: 4, label: 'High - Large complex feature, 5+ interconnected flows, many new components' },
        { value: 5, label: 'Very High - Massive project, complete redesign or new product from 0 to 1' }
      ]
    },
    {
      id: 'uncertainty',
      question: 'How much uncertainty or research is involved?',
      options: [
        { value: 1, label: 'None - Problem and solution are crystal clear, no research needed' },
        { value: 2, label: 'Low - Requirements clear, maybe one round of usability testing' },
        { value: 3, label: 'Medium - Solution needs discovery, multiple rounds of testing required' },
        { value: 4, label: 'High - Problem space is ambiguous, significant discovery needed' },
        { value: 5, label: 'Very High - High ambiguity in new domain, foundational research required' }
      ]
    },
    {
      id: 'dependency',
      question: 'What level of dependency and alignment is required?',
      options: [
        { value: 1, label: 'Low - 1 designer, minimal PM/Eng alignment' },
        { value: 2, label: 'Low - 1 designer, standard PM/Eng alignment' },
        { value: 3, label: 'Medium - Multiple designers/teams, regular check-ins needed' },
        { value: 4, label: 'High - Multiple teams (Eng, Legal, Marketing), dedicated alignment' },
        { value: 5, label: 'Critical - Entire team/company, senior leadership buy-in required' }
      ]
    },
    {
      id: 'estimate',
      question: 'How long do you think this Epic will take to complete?',
      type: 'text',
      placeholder: 'e.g., 2 sprints, 1 quarter, 3 months'
    }
  ]

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateRecommendation(newAnswers)
    }
  }

  const calculateRecommendation = (finalAnswers) => {
    const avgScore = (finalAnswers.scope + finalAnswers.uncertainty + finalAnswers.dependency) / 3
    
    let size
    if (avgScore <= 1.3) size = 'XS'
    else if (avgScore <= 2.3) size = 'S'
    else if (avgScore <= 3.3) size = 'M'
    else if (avgScore <= 4.3) size = 'L'
    else size = 'XL'

    setRecommendation({
      size,
      details: epicSizeData[size],
      userEstimate: finalAnswers.estimate
    })
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendation(null)
  }

  if (recommendation) {
    return (
      <div className="sizing-flow">
        <div className="flow-header">
          <h2>📊 Epic Sizing Recommendation</h2>
        </div>
        
        <div className="recommendation">
          <div className="recommendation-size">
            <span className="size-label">Recommended T-Shirt Size</span>
            <span className="size-value epic-size">{recommendation.size}</span>
          </div>
          
          <div className="recommendation-details">
            <div className="detail-section">
              <h4>⏱️ Approximate Duration</h4>
              <p>{recommendation.details.sprints}</p>
            </div>
            
            <div className="detail-section">
              <h4>📋 Scope & Complexity</h4>
              <p>{recommendation.details.scope}</p>
            </div>
            
            <div className="detail-section">
              <h4>🔍 Uncertainty & Research</h4>
              <p>{recommendation.details.uncertainty}</p>
            </div>
            
            <div className="detail-section">
              <h4>🤝 Dependency & Alignment</h4>
              <p>{recommendation.details.dependency}</p>
            </div>
            
            {recommendation.userEstimate && (
              <div className="detail-section user-estimate">
                <h4>💭 Your Estimate</h4>
                <p>{recommendation.userEstimate}</p>
              </div>
            )}
          </div>
          
          <div className="recommendation-note">
            <p><strong>Remember:</strong> T-shirt sizing is for quick, relative effort estimation to help with roadmap planning and prioritization. If this Epic is sized L or larger, consider breaking it down before starting work.</p>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="btn-secondary" onClick={handleRestart}>Size Another Epic</button>
          <button className="btn-secondary" onClick={onReset}>Back to Home</button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="sizing-flow">
      <div className="flow-header">
        <h2>📊 Epic Sizing</h2>
        <div className="progress">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="question-container">
        <h3>{question.question}</h3>
        
        {question.type === 'text' ? (
          <div className="text-input-container">
            <input
              type="text"
              className="text-input"
              placeholder={question.placeholder}
              value={answers[question.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && answers[question.id]) {
                  handleAnswer(question.id, answers[question.id])
                }
              }}
            />
            <button 
              className="btn-primary"
              onClick={() => handleAnswer(question.id, answers[question.id] || '')}
            >
              {currentQuestion === questions.length - 1 ? 'Get Recommendation' : 'Next'}
            </button>
          </div>
        ) : (
          <div className="options">
            {question.options.map((option) => (
              <button
                key={option.value}
                className={`option-button ${answers[question.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button className="btn-secondary" onClick={handleBack}>← Back</button>
        )}
        <button className="btn-secondary" onClick={onReset}>Cancel</button>
      </div>
    </div>
  )
}

export default EpicSizing