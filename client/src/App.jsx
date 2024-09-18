import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import BoardPage from './pages/BoardPage/BoardPage'
import Footer from './components/Footer/Footer';
import Header from './components/NewHeader/NewHeader';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { AuthProvider } from './context/auth-context';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
  <>
  <AuthProvider>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path ='/login' element={<Login />} />
        <Route path ='/signup' element={<Signup />} />
        <Route path ='/dashboard' element={<Dashboard />} />
        <Route path='/board/:id' element={<BoardPage />} />
        <Route path ='/board/:id/project-details' element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </AuthProvider>
  </>
  )
}

export default App
