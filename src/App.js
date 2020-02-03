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
          <Cell small={12} medium={9}>
            <div className="card">
              <div className="busca input-group">
                <input placeholder="Buscar fundo por nome" />
                <i class="mdi mdi-magnify float-right"></i>
              </div>
              <div className="filters">
                <input
                  type="range"
                  name="minimum-application-value"
                  min="0"
                  max="16"
                  step="1"
                ></input>
              </div>
            </div>
          </Cell>
          <Cell small={12} medium={3}>
            <div className="card">
              <div className="card-title">
                <div className="checkbox">
                  <input type="checkbox" name="renda-fixa-all" />
                  <label>RENDA FIXA</label>
                </div>
              </div>
              <div class="card-content">
                <div className="checkbox">
                  <input type="checkbox" name="indexado-soberano" />
                  <label>Indexado Soberano</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" name="renda-fixa" />
                  <label>Renda Fixa</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" name="renda-fixa" />
                  <label>Renda Fixa Crédito Privado</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" name="renda-fixa" />
                  <label>Crédito Privado High Yield</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" name="renda-fixa" />
                  <label>Renda Fixa Inflação Soberano</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" name="renda-fixa" />
                  <label>Inflação Crédito Privado</label>
                </div>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    </div>
  );
}

export default App;
