import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import DocCared from './components/DocCard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Document from './pages/Document'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/docs' element={<DocCared />}></Route>
        <Route path='/doc' element={<Document />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
