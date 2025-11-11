import { useState } from 'react'

const storyPointsData = {
  1: {
    complexity: 'None - Quick fix, clear actions / design adjustments to be done',
    slipRisk: 'Very low',
    example: 'Office hour, design consult, px-papercuts',
    notes: 'A quick design adjustment that can be done during design consult or office hours. Easy to get done during the sprint.'
  },
  2: {
    complexity: 'Low - Some design gaps to consider, clear plan of action for design',
    slipRisk: 'Low',
    example: 'Low-fi or Hi-fi of a couple screens (part of a user flow), PRD review',
    notes: 'Need to adjust or add some screens to an existing user flow and can do it within a week. Fairly easily done during the sprint.'
  },
  3: {
    complexity: 'Medium - Scope is manageable, need to consider some design options',
    slipRisk: 'Some',
    example: 'Low-fi or Hi-fi of a full end-to-end user flow design',
    notes: 'Need to adjust an end-to-end user flow and think through some design options and share to get feedback. Possible to accomplish within the 2 week sprint, with a small possibility of carrying over.'
  },
  5: {
    complexity: 'High - Familiar domain, need to understand scope and define design direction',
    slipRisk: 'Medium/High',
    example: 'Design discovery or specific research plan',
    notes: 'Need to research the scope, discuss with stakeholders to define direction. Familiar with product domain and stakeholders so can be accomplished within the 2 week sprint. May carry over.'
  },
  8: {
    complexity: 'High - Unknown/new domain, need to understand scope and define design direction',
    slipRisk: 'High',
    example: 'Design discovery or specific research plan (new product or domain)',
    notes: 'Need to research the scope, discuss with stakeholders to define direction. Unfamiliar product domain and stakeholders. It\'s possible this could be completed within the 2 week sprint, but has a higher chance of carrying over.'
  },
  13: {
    complexity: 'Need to break into several stories',
    slipRisk: 'High',
    example: 'Initial discovery ticket that needs to be re-scoped and divided',
    notes: 'Certain that can not be done within one sprint. This story should be broken down into smaller stories.'
  }
}

function StorySizing({ onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendation, setRecommendation] = useState(null)

  const questions = [
    {
      id: 'complexity',
      question: 'How would you describe the complexity of this story?',
      options: [
        { value: 1, label: 'None - Quick fix or clear design adjustment' },
        { value: 2, label: 'Low - Some design gaps, clear plan of action' },
        { value: 3, label: 'Medium - Manageable scope, need to consider design options' },
        { value: 4, label: 'High - Need to understand scope and define direction (familiar domain)' },
        { value: 5, label: 'High - Need to understand scope and define direction (new/unknown domain)' },
        { value: 6, label: 'Very High - Needs to be broken into several stories' }
      ]
    },
    {
      id: 'scope',
      question: 'What is the scope of work?',
      options: [
        { value: 1, label: 'Quick adjustment or consultation' },
        { value: 2, label: 'A couple of screens (part of a user flow)' },
        { value: 3, label: 'Full end-to-end user flow' },
        { value: 4, label: 'Design discovery or research plan' },
        { value: 5, label: 'Large discovery requiring multiple stories' }
      ]
    },
    {
      id: 'familiarity',
      question: 'How familiar are you with this product domain and stakeholders?',
      options: [
        { value: 1, label: 'Very familiar - I know exactly what needs to be done' },
        { value: 2, label: 'Familiar - I have good context and clear direction' },
        { value: 3, label: 'Somewhat familiar - I need some clarification' },
        { value: 4, label: 'Unfamiliar - New domain or stakeholders for me' },
        { value: 5, label: 'Completely new - Requires significant learning' }
      ]
    },
    {
      id: 'uncertainty',
      question: 'How much uncertainty or unknowns are there?',
      options: [
        { value: 1, label: 'None - Everything is clear and defined' },
        { value: 2, label: 'Low - Minor details to figure out' },
        { value: 3, label: 'Medium - Some design exploration needed' },
        { value: 4, label: 'High - Significant research or discovery required' },
        { value: 5, label: 'Very High - Major unknowns that need investigation' }
      ]
    },
    {
      id: 'estimate',
      question: 'How long do you think this story will take to complete?',
      type: 'text',
      placeholder: 'e.g., 2 hours, 1 day, 3 days, 1 week'
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
    // Calculate average score from all numeric answers
    const scores = [finalAnswers.complexity, finalAnswers.scope, finalAnswers.familiarity, finalAnswers.uncertainty]
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
    
    let points
    if (avgScore <= 1.5) points = 1
    else if (avgScore <= 2.5) points = 2
    else if (avgScore <= 3.5) points = 3
    else if (avgScore <= 4.5) points = 5
    else if (avgScore <= 5.5) points = 8
    else points = 13

    setRecommendation({
      points,
      details: storyPointsData[points],
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
          <h2>📝 Story Points Recommendation</h2>
        </div>
        
        <div className="recommendation">
          <div className="recommendation-size">
            <span className="size-label">Recommended Story Points</span>
            <span className="size-value story-points">{recommendation.points}</span>
          </div>
          
          <div className="recommendation-details">
            <div className="detail-section">
              <h4>🎯 Complexity</h4>
              <p>{recommendation.details.complexity}</p>
            </div>
            
            <div className="detail-section">
              <h4>🍌 Slip Risk</h4>
              <p>{recommendation.details.slipRisk}</p>
            </div>
            
            <div className="detail-section">
              <h4>💡 Example</h4>
              <p>{recommendation.details.example}</p>
            </div>
            
            <div className="detail-section">
              <h4>📌 Notes</h4>
              <p>{recommendation.details.notes}</p>
            </div>
            
            {recommendation.userEstimate && (
              <div className="detail-section user-estimate">
                <h4>💭 Your Estimate</h4>
                <p>{recommendation.userEstimate}</p>
              </div>
            )}
          </div>
          
          {recommendation.points === 13 && (
            <div className="recommendation-warning">
              <p><strong>⚠️ Action Required:</strong> This story is too large for a single sprint. Please break it down into smaller, more manageable stories before adding it to a sprint.</p>
            </div>
          )}
          
          <div className="recommendation-note">
            <p><strong>Remember:</strong> Story points are for planning, not commitment. They help you and your team understand capacity and create consistency in estimation. The goal is relative sizing within your team.</p>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="btn-secondary" onClick={handleRestart}>Size Another Story</button>
          <button className="btn-secondary" onClick={onReset}>Back to Home</button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="sizing-flow">
      <div className="flow-header">
        <h2>📝 Story Sizing</h2>
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
              Get Recommendation
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

export default StorySizing