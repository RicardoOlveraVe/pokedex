import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import "../Style/PokedexIdPageStyle.css"

const PokedexIdPage = () => {

    const { id } = useParams()

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const [pokemon, getPokemon] = useFetch(url)

    useEffect(() => {
      getPokemon()
    }, [id])

    console.log(pokemon)
    const firstType = pokemon?.types[0].type.name
  return (
    <div className="info__container">
      <img className="page__title" src="/pokedexTitle.svg" alt="" />
      <img className="page__top" src="/pokeTop.svg" alt="" />
      <div className="container">
        <header className={`info__header ${firstType}-gradient`}>
            <img className="info__img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
          </header>
          <section className="info">
                <h1 className="info__id">#{id}</h1>
                <h2 className="info__name">{pokemon?.name}</h2>
                <div className="list__general">
                  <ul className="general__list">
                    <li className="list__general">
                      <span className="general__label">Weight</span>
                      <span className="general__value">{pokemon?.weight}</span>
                    </li>
                    <li className="list__general">
                      <span className="general__label">Height</span>
                      <span className="general__value">{pokemon?.height}</span>
                    </li>
                  </ul>
                </div>
                <div className="info__special">
                  <div className="type">
                    <h3>Type</h3>
                    <ul className="type__list">
                      {
                        pokemon?.types.map(typeInfo => (
                          <li className={`list__type ${typeInfo.type.name}-bg`} key={typeInfo.type.url}>
                            {typeInfo.type.name}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="ability">
                    <h3>Abilities</h3>
                    <ul className="ability__list">
                      {
                          pokemon?.abilities.map(abilityInfo => (
                            <li className="list__ability" key={abilityInfo.ability.url}>
                              {abilityInfo.ability.name}
                            </li>
                          ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="stat">
                  <h3 className="stat__title">Stats</h3>
                  <div className="stat__list">
                    {
                      pokemon?.stats.map(statInfo => (
                        <div className="list__stat" key={statInfo.stat.url}>
                          <div className="stat__bar">
                            <span className="stat__label">{statInfo.stat.name}</span>
                            <span className="stat__value">{statInfo.base_stat}/150</span>
                          </div>
                          <div className="menu">
                            <div className="menu__stat"
                              style={{width: `${(statInfo.base_stat/150)*100}%`}}
                            ></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
            </div>
          </section>
      </div>
      <div>
        <h3>Movements</h3>
        <ul>
          {
            pokemon?.moves.map(moveInfo => (
              <li key={moveInfo.move.url}>
                {moveInfo.move.name}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default PokedexIdPage