import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Story from './pages/Story'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <Router>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
  )
}

export default App
