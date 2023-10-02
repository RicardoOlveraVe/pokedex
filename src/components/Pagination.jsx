import { useState } from "react"
import "../Style/Pagination.css"

const Pagination = ({pagina, setPagina, max}) => {

    const [input, setInput] = useState(1)

    const nextPage = () => {
        setInput(parseInt(input) + 1)
        setPagina(parseInt(pagina) + 1)
    }

    const previousPage = () => {
        setInput (parseInt(input) - 1)
        setPagina (parseInt(pagina) - 1)
    }

    const onKeyDown = e => {
        if (e.keyCode == 13) {
            setPagina (parseInt(e.target.value))
            if (
                parseInt (e.target.value < 1) ||
                parseInt (e.target.value) > Math.ceil (max) ||
                isNaN (parseInt (e.target.value))
              ) {
                setPagina (1);
                setInput (1);
              } else {
                setPagina (parseInt (e.target.value));
              }
        }
    }

    const onChange = e => {
        setInput (e.target.value);
      };

    console.log(pagina)
    console.log(setPagina)
    console.log(max)
    return(
        <div className="pagination__container">
            <div className="pagination">
                <button disabled={pagina === 1 || pagina < 1} onClick={previousPage} className="pagination__btn">
                    <img className="svg-icon" src="/arrowLeft.svg" alt="" />
                </button>
                <input 
                className="pagination__input"
                onChange={e => onChange (e)}
                onKeyDown={e => onKeyDown (e)}
                name="page"
                autoComplete="off"
                value={input}
                type="text" 
                />
                <button 
                 disabled={pagina === Math.ceil (max) || pagina > Math.ceil (max)}
                 onClick={nextPage}
                className="pagination__btn"
                >
                    <img className="svg-icon" src="/arrowRight.svg" alt="" />
                </button>
            </div>
            <div className="pagination__text">
                <p> de {max}</p>
            </div>
        </div>
    )

}

export default Pagination