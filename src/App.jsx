
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import PokedexPage from './Pages/PokedexPage'
import PokedexIdPage from './Pages/PokedexIdPage'
import ProtectedRoutes from './Pages/ProtectedRoutes'

function App() {


  return (
   <div>
    <Routes>
        <Route path='/' element={<HomePage />}/>

        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex' element={<PokedexPage />}/>
          <Route path='/pokedex/:id' element={ <PokedexIdPage /> } />
        </Route>
        
    </Routes>
   </div>
  )
}

export default App
