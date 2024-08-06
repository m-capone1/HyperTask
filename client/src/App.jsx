import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage'
import BoardPage from './pages/BoardPage/BoardPage'
import Footer from './components/Footer/Footer';
import Header from './components/header/header';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/get-started' element={<GetStartedPage />} />
          <Route path='/board' element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
