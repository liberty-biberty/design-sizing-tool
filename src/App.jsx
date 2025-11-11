import { useState } from 'react'
import FlowSelector from './components/FlowSelector'
import EpicSizing from './components/EpicSizing'
import StorySizing from './components/StorySizing'

function App() {
  const [selectedFlow, setSelectedFlow] = useState(null)

  const handleReset = () => {
    setSelectedFlow(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="text-center py-12 px-8 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">UX Design Sizing Tool</h1>
        <p className="text-lg opacity-95">Size your Jira tickets with confidence</p>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-8">
        {!selectedFlow && (
          <FlowSelector onSelectFlow={setSelectedFlow} />
        )}
        
        {selectedFlow === 'epic' && (
          <EpicSizing onReset={handleReset} />
        )}
        
        {selectedFlow === 'story' && (
          <StorySizing onReset={handleReset} />
        )}
      </main>
    </div>
  )
}

export default App
