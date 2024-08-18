import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage'
import BoardPage from './pages/BoardPage/BoardPage'
import Footer from './components/Footer/Footer';
import Header from './components/header/header';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { AuthProvider } from './context/auth-context';

function App() {
  return (
  <>
  <AuthProvider>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path='/get-started' element={<GetStartedPage />} />
        <Route path ='/login' element={<Login />} />
        <Route path ='/signup' element={<Signup />} />
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
