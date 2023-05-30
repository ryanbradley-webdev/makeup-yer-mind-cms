import { Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Blogs from './components/blogs/Blogs'
import Looks from './components/looks/Looks'
import { DataProvider } from './contexts/DataContext'
import Messages from './components/messages/Messages'
import EditBlog from './components/blogs/EditBlog'
import EditLook from './components/looks/EditLook'
import MessageDetail from './components/messages/MessageDetail'
import Home from './components/home/Home'
import NotFound from './components/NotFound'
import ColorMatches from './components/color-matches/ColorMatches'
import Promos from './components/promotions/Promos'
import PromosDetail from './components/promotions/PromosDetail'
import ColorMatchDetail from './components/color-matches/ColorMatchDetail'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <DataProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='blogs'>
            <Route index element={<Blogs />} />
            <Route path='new' element={<EditBlog type='new' />} />
            <Route path=':id' element={<EditBlog type='edit' />} />
          </Route>
          <Route path='looks'>
            <Route index element={<Looks />} />
            <Route path='new' element={<EditLook type='new' />} />
            <Route path=':id' element={<EditLook type='edit' />} />
          </Route>
          <Route path='color-matches'>
            <Route index element={<ColorMatches />} />
            <Route path=':id' element={<ColorMatchDetail />} />
          </Route>
          <Route path='promotions'>
            <Route index element={<Promos />} />
            <Route path=':id' element={<PromosDetail />} />
          </Route>
          <Route path='messages'>
            <Route index element={<Messages />} />
            <Route path=':id' element={<MessageDetail />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </DataProvider>
    </>
  )
}