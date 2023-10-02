import { useRef } from "react"
import { setTrainerSlice } from "../store/slices/trainer.slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../Style/HomePageStyle.css"


const HomePage = () => {

  const trainer = useSelector(store => store.trainer)

  const inputTrainer = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleTrainer = e => {
    e.preventDefault()
    dispatch(setTrainerSlice(inputTrainer.current.value.trim()))
    navigate('/pokedex')
  }

  return (
    <div className="home__container">
      <div className="home">
        <div className="home__title">
          <img className="title" src="/pokedexTitle.svg" alt="" />
        </div>
        <div className="home__content">
          <div className="content">
            <h2>Hi Trainer!</h2>
            <p>To start, please enter your trainer name</p>
            <form className="home__form" onSubmit={handleTrainer}>
                <input className="home__input" placeholder="Yousr Name..." ref={inputTrainer} type="text" />
                <button className="home__btn">Start!</button>
            </form>
          </div>
        </div>
          <img className="bottom__img" src="/homeImage.svg" alt="" />
      </div>
    </div>
  )
}

export default HomePage