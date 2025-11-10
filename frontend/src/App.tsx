import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Catalogue from './pages/Catalogue/Catalogue'
import Store from './pages/Store/Store'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import BookDetail from './pages/BookDetail/BookDetail'
import ProfileSettings from './pages/ProfileSettings/ProfileSettings'
import AdminRoute from "./routes/AdminRoute";
import AdminBooksPage from './pages/AdminBooksPage/AdminBooksPage';

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
          <Route path='/store' element={<Store />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/books/:id' element={<BookDetail />} />
          <Route path='/profile/settings' element={<ProfileSettings />} />
          <Route path="/admin/books" element={<AdminRoute><AdminBooksPage /></AdminRoute>} />
        </Routes>
      </main>
    </>
  )
}

export default App
