import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import EditContacts from './components/EditContact'
import ViewContacts from './components/ViewContact'
import Layout from './components/Layout'

function App() {


  const route = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<ContactList />} />
      <Route path='/addContact' element={<AddContact />} />
      <Route path='editContact/:contactId' element={<EditContacts />} />
      <Route path='/viewContact/:contactId' element={<ViewContacts />} />
    </Route>
  ))


  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
