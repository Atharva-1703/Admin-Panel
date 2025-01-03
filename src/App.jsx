import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddQuestionPage from './pages/AddQuestionPage'
import CsvFormPage from './pages/CsvFormPage'
import Router from './routes/Routes'

function App() {


  return (
    <div >
      <Router/>
    <BrowserRouter>
    
    <Routes>
      <Route path='/add-manually' element={<AddQuestionPage />} />
      <Route path='/add-csv' element={<CsvFormPage />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
