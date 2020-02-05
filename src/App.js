import React from "react";
import API from "./components/api";
import {
  getFunds,
  sortByMainStrategy,
  sortByMacroStrategy
} from "./components/filtros";
import "./css/App.css";
import { Grid, Cell } from "react-foundation";
import headerBackground from "./img/background.jpg";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      funds: [],
      all_funds: [],
      minimum_application: "20.000,00",
      minimum_application_bg: "100%",
      retrieval_days: 30,
      retrieval_days_bg: "100%",
      fund_risk: 12,
      fund_risk_line: "90%"
    };
    this.searchChange = this.searchChange.bind(this);
    this.minimumApplicationChange = this.minimumApplicationChange.bind(this);
    this.retrievalDaysChange = this.retrievalDaysChange.bind(this);
    this.fundRiskChange = this.fundRiskChange.bind(this);
  }
  componentDidMount() {
    getFunds(this);
  }

  // Busca
  searchChange(event) {
    const value = event.target.value.toLowerCase();
    let funds = this.state.all_funds,
      result = [];
    result = funds.filter(item => {
      return item.simple_name.toLowerCase().search(value) !== -1;
    });
    this.setState({ funds: result });
  }

  // Filtro: Aplicação mínima
  minimumApplicationChange(event) {
    const values = [
      "100,00",
      "200,00",
      "400,00",
      "500,00",
      "800,00",
      "1.000,00",
      "1.500,00",
      "2.000,00",
      "5.000,00",
      "7.500,00",
      "10.000,00",
      "12.000,00",
      "15.000,00",
      "17.500,00",
      "20.000,00"
    ];
    const value = values[event.target.value];
    const bg = (event.target.value / 15) * 100 + "%";

    let funds = this.state.all_funds,
      result = [];
    result = funds.filter(item => {
      return (
        item.operability.minimum_initial_application_amount <=
        parseInt(value.replace(".", ""))
      );
    });

    this.setState({
      minimum_application: value,
      minimum_application_bg: bg,
      funds: result
    });
  }

  // Filtro: Prazo de resgate
  retrievalDaysChange(event) {
    const value = event.target.value;
    const bg = (event.target.value / 30) * 100 + "%";

    let funds = this.state.all_funds,
      result = [];
    result = funds.filter(item => {
      return (
        parseInt(item.operability.retrieval_quotation_days) <= parseInt(value)
      );
    });

    this.setState({
      retrieval_days: value,
      retrieval_days_bg: bg,
      funds: result
    });
  }

  // Filtro: Perfil de risco do fundo
  fundRiskChange(event) {
    const sizes = [0, 0, 7, 15, 20, 30, 40, 50, 55, 65, 75, 80, 90];
    const value = event.target.value;
    let line = sizes[event.target.value];
    let funds = this.state.all_funds,
      result = [];
    result = funds.filter(item => {
      return (
        parseInt(item.specification.fund_risk_profile.score_range_order) <=
        parseInt(value)
      );
    });

    this.setState({
      fund_risk: value,
      fund_risk_line: line + "%",
      funds: result
    });
  }

  // Render
  render() {
    const header = {
      backgroundImage: `url(${headerBackground})`
    };
    // eslint-disable-next-line
    var title_macro_strategy = true,
      title_main_strategy = true,
      last_macro_strategy = "",
      last_main_strategy = "";
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
                  <input
                    placeholder="Buscar fundo por nome"
                    onChange={this.searchChange}
                  />
                  <i className="mdi mdi-magnify float-right"></i>
                </div>
                {
                  // Filtros
                }
                <div className="filters">
                  <Grid className="display">
                    <Cell small={12} medium={4}>
                      <p>
                        <strong>Aplicação mínima</strong>
                      </p>
                      <input
                        type="range"
                        name="minimum-application-value"
                        min="0"
                        max="14"
                        step="1"
                        onChange={this.minimumApplicationChange}
                        style={{
                          backgroundSize: this.state.minimum_application_bg
                        }}
                      />
                      Até R${this.state.minimum_application}
                    </Cell>
                    <Cell small={12} medium={4}>
                      <p>
                        <strong>Perfil de risco de fundo</strong>
                      </p>
                      <div className="fund-risk-filter">
                        <input
                          type="range"
                          name="fund-risk-value"
                          min="1"
                          max="12"
                          step="1"
                          onChange={this.fundRiskChange}
                        />
                        <div className="diagonal"></div>
                        <div
                          className="line"
                          style={{
                            width: this.state.fund_risk_line
                          }}
                        ></div>
                      </div>
                    </Cell>
                    <Cell small={12} medium={4}>
                      <p>
                        <strong>Prazo de resgate</strong>
                      </p>
                      <input
                        type="range"
                        name="retrieval-days-value"
                        min="0"
                        max="30"
                        step="1"
                        onChange={this.retrievalDaysChange}
                        style={{
                          backgroundSize: this.state.retrieval_days_bg
                        }}
                      />
                      Até {this.state.retrieval_days} dias úteis
                    </Cell>
                  </Grid>
                </div>
                Horário limite de aplicações: 12:00
              </div>
              {
                // Lista de Fundos
                // Cabeçalho
              }
              <div className="card">
                <Grid className="funds">
                  <Cell small={6} medium={4}>
                    <strong>Fundo</strong>
                  </Cell>
                  <Cell small={6} medium={1}>
                    <strong>Data da cota</strong>
                  </Cell>
                  <Cell small={6} medium={1}>
                    <strong>Mês (%)</strong>
                  </Cell>
                  <Cell small={6} medium={1}>
                    <strong>2020 (%)</strong>
                  </Cell>
                  <Cell small={6} medium={1}>
                    <strong>12M (%)</strong>
                  </Cell>
                  <Cell small={6} medium={2}>
                    <strong>Aplicação mínima (R$)</strong>
                  </Cell>
                  <Cell small={6} medium={1}>
                    <strong>Prazo de resgate</strong>
                  </Cell>
                  <Cell small={6} medium={1}>
                    <strong>Aplicar</strong>
                  </Cell>
                </Grid>

                {//
                // Listar Fundos
                //

                this.state.funds.map(item => {
                  // Formatar da data
                  let quota_date = item.quota_date;
                  quota_date = quota_date.split("-");
                  quota_date =
                    quota_date[2] + "/" + quota_date[1] + "/" + quota_date[0];
                  // Formatar profits
                  let profits_day = item.profitabilities.day * 100;
                  profits_day = profits_day.toFixed(2).replace(".", ",");
                  let profits_year = item.profitabilities.year * 100;
                  profits_year = profits_year.toFixed(2).replace(".", ",");
                  let profits_m12 = item.profitabilities.m12 * 100;
                  profits_m12 = profits_m12.toFixed(2).replace(".", ",");
                  //

                  if (
                    item.specification.fund_macro_strategy.name !==
                    this.last_macro_strategy
                  ) {
                    this.last_macro_strategy =
                      item.specification.fund_macro_strategy.name;
                    this.title_macro_strategy = true;
                  } else {
                    this.title_macro_strategy = false;
                  }
                  if (
                    item.specification.fund_main_strategy.name !==
                    this.last_main_strategy
                  ) {
                    this.last_main_strategy =
                      item.specification.fund_main_strategy.name;
                    this.title_main_strategy = true;
                  } else {
                    this.title_main_strategy = false;
                  }

                  return (
                    <div key={item.id}>
                      {this.title_macro_strategy ? (
                        <div className="card-title-dark">
                          <strong>
                            {item.specification.fund_macro_strategy.name}
                          </strong>
                        </div>
                      ) : null}
                      {this.title_main_strategy ? (
                        <div className="card-title">
                          <strong>
                            {item.specification.fund_main_strategy.name}
                          </strong>
                        </div>
                      ) : null}
                      <Grid className="funds" key={item.id}>
                        <Cell
                          small={6}
                          medium={4}
                          className={
                            "funds-risk-" +
                            item.specification.fund_risk_profile
                              .score_range_order
                          }
                        >
                          <p className="funds-title">
                            {item.simple_name}
                            {item.specification.is_qualified ? (
                              <i className="mdi mdi-star-circle qualified"></i>
                            ) : null}
                          </p>
                          <span className="funds-type">
                            {item.specification.fund_type +
                              " | " +
                              item.specification.fund_class}
                          </span>
                        </Cell>
                        <Cell small={6} medium={1}>
                          {quota_date}
                        </Cell>
                        <Cell small={6} medium={1}>
                          {profits_day}
                        </Cell>
                        <Cell small={6} medium={1}>
                          {profits_year}
                        </Cell>
                        <Cell small={6} medium={1}>
                          {profits_m12}
                        </Cell>
                        <Cell small={6} medium={2}>
                          {item.operability.minimum_initial_application_amount}
                        </Cell>
                        <Cell small={6} medium={1}>
                          {item.operability.retrieval_quotation_days_str
                            .length < 6 ? (
                            item.operability.retrieval_quotation_days_str
                          ) : (
                            <i className="mdi mdi-information-outline prazo-info"></i>
                          )}
                        </Cell>
                        <Cell small={6} medium={1}>
                          <i className="apply mdi mdi-reply"></i>
                        </Cell>
                      </Grid>
                    </div>
                  );
                })}
              </div>
            </Cell>
            {
              // Fitros Direita
            }
            <Cell small={12} medium={3}>
              <div className="card">
                <div className="card-title">
                  <div className="checkbox">
                    <input type="checkbox" name="renda-fixa-all" />
                    <label>RENDA FIXA</label>
                  </div>
                </div>
                <div className="card-content">
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
}
