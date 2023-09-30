import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import "../../Style/PokeCard.css"

const PokeCard = ({url}) => {

    const [ pokemon, getPokemon ] = useFetch(url)
    const navigation = useNavigate()

    useEffect(() => {
        getPokemon()
    }, [])


    const handleNavigator = () => {
        navigation(`/pokedex/${pokemon.id}`)
    }
  return (
    <article className="card__container" onClick={handleNavigator}>
        <div className="card">
            <header>
                <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section>
                <h3>{pokemon?.name}</h3>
                <ul>
                    {
                        pokemon?.types.map(typeInfo => (
                            <li key={typeInfo.type.url}>
                                {typeInfo.type.name}
                            </li>
                        ))
                    }
                    <div>type</div>
                </ul>
                <hr />
                <ul>
                    {
                        pokemon?.stats.map(statInfo => (
                            <li key={statInfo.stat.url}>
                                <span>{statInfo.stat.name}</span>
                                <span>{statInfo.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    </article>
  )
}

export default PokeCard