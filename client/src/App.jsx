import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import DocCared from './components/DocCard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path='/signup' element={<SignupForm />}></Route>
        <Route path='/docs' element={<DocCared />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
