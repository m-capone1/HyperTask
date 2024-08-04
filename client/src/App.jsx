import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage'
import Footer from './components/Footer/Footer';
import Header from './components/header/header';

function App() {
  return (
    <>
    <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/get-started' element={<GetStartedPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
