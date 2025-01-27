import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Lin from './components/Lin'
import Ana from './components/Ana'
import Settings from './components/Settings'
import Modal from './components/Modal'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/links' element={<Lin/>}/>
          <Route path='/analytics' element={<Ana/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/Modal' element={<Modal/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App