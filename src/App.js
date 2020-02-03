import React from "react";
import "./css/App.css";
import { Button, Colors, Link, Grid, Cell } from "react-foundation";
import headerBackground from "./img/background.jpg";

function App() {
  var header = {
    backgroundImage: `url(${headerBackground})`
  };
  return (
    <div>
      <div className="header" style={header}>
        <h1>Lista de Fundos de Investimento</h1>
        <p>Conheça a nossa lista de fundos</p>
      </div>
      <div className="grid-container">
        <Grid className="display">
          <Cell small={12} medium={10}>
            <div className="card">
              <input placeholder="Busca fundo por nome" />
            </div>
          </Cell>
          <Cell small={12} medium={2}>
            <div className="card">
              <input type="checkbox" className="checkboxAzul" />
              RENDA FIXA
            </div>
          </Cell>
        </Grid>
      </div>
    </div>
  );
}

export default App;
