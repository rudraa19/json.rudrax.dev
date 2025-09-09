import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Document from './pages/Document'
import AllDocs from './pages/AllDocs'
import HomePage from './pages/HomePage'
import NewDoc from './pages/NewDoc'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/new' element={<NewDoc />}></Route>
          <Route path='/docs/:id' element={<Document />}></Route>
          <Route path='/docs' element={<AllDocs />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
