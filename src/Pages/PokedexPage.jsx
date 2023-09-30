import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import "../Style/PokedexPageStyle.css"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')

  const trainer = useSelector(store => store.trainer)

  const inputSearch = useRef()

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0.'
  const [ pokemons, getPokemons, getTypePokemon] = useFetch(url)

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

  const pokeFiltered = pokemons?.results.filter(poke => poke.name.includes(inputValue))

  return (
    <div className="pokedex">
      <img className="page__top" src="/public/pokeTop.svg" alt="" />
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
          pokeFiltered?.map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PokedexPage