import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './utils/ThemeContext'
import Layout from './components/Layout'
import Portal from './pages/Portal'
import DOJ from './pages/DOJ'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Portal />} />
            <Route path="npa/*" element={<Navigate to="/NPA_fictional project.html" replace />} />
            <Route path="bop/*" element={<Navigate to="/BOP_fictional project.html" replace />} />
            <Route path="ctb/*" element={<Navigate to="/CTB_fictional project.html" replace />} />
            <Route path="doj/*" element={<DOJ />} />
            <Route path="interior/*" element={<Navigate to="/ID_fictional project.html" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
