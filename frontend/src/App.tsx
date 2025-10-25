import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Catalogue from './pages/Catalogue/Catalogue'
import Community from './pages/Community/Community'
import Store from './pages/Store/Store'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

function App() {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Catalogue />} />
          <Route path='/community' element={<Community />} />
          <Route path='/store' element={<Store />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
