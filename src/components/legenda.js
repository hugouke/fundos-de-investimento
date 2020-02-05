import React, { PureComponent } from "react";
import { Grid, Cell } from "react-foundation";

export default class Legenda extends PureComponent {
  render() {
    return (
      <div className="card legenda">
        <p>
          <strong>LEGENDA</strong>
        </p>
        <Grid>
          <Cell small={1} medium={1}>
            <i className="mdi mdi-star-circle"></i>
          </Cell>
          <Cell small={11} medium={11}>
            Fundo para investidor qualificado
          </Cell>
          <Cell small={1} medium={1}>
            <i className="mdi mdi-check-circle"></i>
          </Cell>
          <Cell small={11} medium={11}>
            Você já investiu neste fundo
          </Cell>
          <Cell small={1} medium={1}>
            <i className="mdi mdi-information-outline"></i>
          </Cell>
          <Cell small={11} medium={11}>
            Entenda o resgate deste fundo
          </Cell>
          <Cell small={1} medium={1}>
            <i className="mdi mdi-block-helper"></i>
          </Cell>
          <Cell small={11} medium={11}>
            Fundo fechado para aplicação
          </Cell>
          <Cell small={1} medium={1}>
            <i className="mdi mdi-reply"></i>
          </Cell>
          <Cell small={11} medium={11}>
            Aplicar neste fundo
          </Cell>
        </Grid>
      </div>
    );
  }
}
