import { useState } from 'react'

import './App.css'
import AddQuizData from './components/addQuestion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CsvUploader from './components/CsvForm'

function App() {


  return (
    <div className='bg-slate-500'>
    <BrowserRouter>
    <Routes>
      <Route path='/add-manually' element={<AddQuizData />} />
      <Route path='/add-csv' element={<CsvUploader />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
