import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage'
import BoardPage from './pages/BoardPage/BoardPage'
import Footer from './components/Footer/Footer';
import Header from './components/header/header';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/get-started' element={<GetStartedPage />} />
          {/* <Route path ='/login' element={<LoginPage />} />  */}
          <Route path='/board/:id' element={<BoardPage />} />
          <Route path ='/board/:id/project-details' element={<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
