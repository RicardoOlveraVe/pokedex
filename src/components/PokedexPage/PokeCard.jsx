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

    const firstType = pokemon?.types[0].type.name

    const handleNavigator = () => {
        navigation(`/pokedex/${pokemon.id}`)
    }
  return (
    <article className="card__container" onClick={handleNavigator}>
        <div className={`card ${firstType}-border`}>
            <header className={`card__header ${firstType}-gradient`}>
                <img className="card__img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className="card__info">
                <h3 className={`card__name ${firstType}-color`}>{pokemon?.name}</h3>
                <ul className="card__type">
                    {
                        pokemon?.types.map(typeInfo => (
                            <li className="type__card" key={typeInfo.type.url}>
                                {typeInfo.type.name}
                            </li>
                        ))
                    }
                </ul>
                    <div className="type__title">type</div>
                <hr />
                <ul className="card__stat">
                    {
                        pokemon?.stats.map(statInfo => (
                            <li className="stat__card" key={statInfo.stat.url}>
                                <span className="stat__name">{statInfo.stat.name}</span>
                                <span className="stat">{statInfo.base_stat}</span>
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