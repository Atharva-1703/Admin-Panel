import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CsvUploader from './container/CsvFormContainer'
import AddQuestionPage from './pages/AddQuestionPage'
import CsvFormPage from './pages/CsvFormPage'

function App() {


  return (
    <div className='bg-slate-500'>
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
