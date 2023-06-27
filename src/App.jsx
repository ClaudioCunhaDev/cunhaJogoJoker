import { useState } from "react";
import perguntas from "./assets/perguntas.json";

function App() {
  const [pontos, setPontos] = useState(0);
  const [indice, setIndice] = useState(0);
  const [joker, setJoker] = useState(7);
  const [disabled, setDisabled] = useState([]);

  const handleResp = (e) => {
    setIndice((prvIndice) => prvIndice + 1);
    console.log(e.target.value);

    setPontos((prvPontos) =>
      e.target.value === perguntas[indice].correta
        ? prvPontos + 100
        : prvPontos - 150 < 0
        ? 0
        : prvPontos - 150
    );
    setDisabled([]);
  };

  const handleJoker = () => {
    setJoker((prvJoker) => (prvJoker > 0 ? prvJoker - 1 : 0));

    const respErradas = perguntas[indice].opcoes.filter(
      (ele) => ele !== perguntas[indice].correta && !disabled.includes(ele)
    );

    const sort = Math.floor(Math.random() * respErradas.length);

    setDisabled((prvDisabled) => [...prvDisabled, respErradas[sort]]);
  };

  return (
    <div className="App">
      <div>
        <h1>Pontos: {pontos} </h1>
      </div>
      <div>
        <h4>Pergunta: {perguntas[indice]?.prompt}</h4>
        <div className="resp">
          {perguntas[indice]?.opcoes.map((ele) => (
            <button
              key={ele}
              value={ele}
              onClick={(e) => handleResp(e)}
              disabled={disabled.includes(ele) ? true : false}
            >
              {ele}
            </button>
          ))}
        </div>
      </div>
      <br />
      <div className="jokerbtn">
        <button
          disabled={joker <= 0 ? true : false}
          onClick={() => handleJoker()}
        >
          Joker
        </button>
        <h4>Disponiveis: {joker} </h4>
      </div>
    </div>
  );
}

export default App;
