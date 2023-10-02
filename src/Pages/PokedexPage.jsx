import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import "../Style/PokedexPageStyle.css"
import Pagination from "../components/Pagination"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')

  const trainer = useSelector(store => store.trainer)

  const inputSearch = useRef()

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0.'
  const [ pokemons, getPokemons, getTypePokemon] = useFetch(url)
  
  const pokeFiltered = pokemons?.results.filter(poke => poke.name.includes(inputValue))
  useEffect (() => {
    if(typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected)
    }
  }, [typeSelected])

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim().toLowerCase())
  }

  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(20)

  const max = (pokeFiltered?.length / porPagina)

  return (
    <div className="pokedex">
      <img className="page__title" src="/pokedexTitle.svg" alt="" />
      <img className="page__top" src="/pokeTop.svg" alt="" />
      <div className="pokedex__info">
        <p>Hi {trainer}</p>
        <form className="pokedex__form" onSubmit={handleSearch}>
          <input className="pokedex__input" ref={inputSearch} placeholder="Search Your Pokemón" type="text" />
          <button className="pokedex__btn">Search</button>
            <SelectType
              setTypeSelected={setTypeSelected}
            />
        </form>
      </div>
      <div className="pokedex__card">
        {
          pokeFiltered?.slice(
            (pagina - 1) * porPagina, 
            (pagina - 1) * porPagina + porPagina)
          .map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }       
        <Pagination
          pagina = {pagina}
          setPagina = {setPagina}
          max = {max}
        />
      </div>
    </div>
  )
}

export default PokedexPage