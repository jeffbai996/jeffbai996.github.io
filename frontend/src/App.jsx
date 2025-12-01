import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './utils/ThemeContext'
import Layout from './components/Layout'
import Portal from './pages/Portal'
import CTB from './pages/CTB'
import DOJ from './pages/DOJ'
import Interior from './pages/Interior'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Portal />} />
          <Route path="npa/*" element={<Navigate to="/NPA_Praya.html" replace />} />
          <Route path="ctb/*" element={<CTB />} />
          <Route path="doj/*" element={<DOJ />} />
          <Route path="interior/*" element={<Interior />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
