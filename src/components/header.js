import React, { PureComponent } from "react";
import headerBackground from "../img/background.jpg";

export default class Header extends PureComponent {
  render() {
    const header = {
      backgroundImage: `url(${headerBackground})`
    };
    return (
      <div className="header" style={header}>
        <h1>Lista de Fundos de Investimento</h1>
        <p>Conheça a nossa lista de fundos</p>
      </div>
    );
  }
}
