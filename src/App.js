import React from "react";
import { Grid, Cell } from "react-foundation";
import { getFunds } from "./components/funds";
import {
  retrievalDaysChange,
  fundRiskChange,
  minimumApplicationChange,
  searchChange
} from "./components/filters";
import "./css/App.css";
import Header from "./components/header";
import FiltersRight from "./components/filters-right";
import Legenda from "./components/legenda";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      funds: [],
      all_funds: [],
      minimum_application: "20.000,00",
      minimum_application_bg: "100%",
      retrieval_days: 30,
      retrieval_days_bg: "100%",
      fund_risk: 12,
      fund_risk_line: "90%"
    };
  }
  componentDidMount() {
    getFunds().then(data =>
      this.setState({
        loading: false,
        funds: data,
        all_funds: data
      })
    );
  }

  render() {
    // prettier-ignore
    // eslint-disable-next-line
    var title_macro_strategy = true,title_main_strategy = true,last_macro_strategy = "",last_main_strategy = "";
    return (
      <div>
        <Header />
        <div className="grid-container">
          <Grid>
            <Cell small={12} medium={12} large={9}>
              <div className="card">
                <div className="busca input-group">
                  <input
                    placeholder="Buscar fundo por nome"
                    onChange={event => searchChange(this, event)}
                  />
                  <i className="mdi mdi-magnify float-right"></i>
                </div>
                {
                  // Filtros
                }
                <div className="filters">
                  <Grid>
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
                        onChange={event =>
                          minimumApplicationChange(this, event)
                        }
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
                          onChange={event => fundRiskChange(this, event)}
                        />
                        <div className="diagonal"></div>
                        <div
                          className="line"
                          style={{
                            width: this.state.fund_risk_line
                          }}
                        ></div>
                      </div>
                      <div className="min">Menor</div>
                      <div className="max">Maior</div>
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
                        onChange={event => retrievalDaysChange(this, event)}
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
                <Grid className="funds no-mobile">
                  <Cell large={4}>
                    <strong>Fundo</strong>
                  </Cell>
                  <Cell large={1}>
                    <strong>Data da cota</strong>
                  </Cell>
                  <Cell large={1}>
                    <strong>Mês (%)</strong>
                  </Cell>
                  <Cell large={1}>
                    <strong>2020 (%)</strong>
                  </Cell>
                  <Cell large={1}>
                    <strong>12M (%)</strong>
                  </Cell>
                  <Cell large={2}>
                    <strong>Aplicação mínima (R$)</strong>
                  </Cell>
                  <Cell large={1}>
                    <strong>Prazo de resgate</strong>
                  </Cell>
                  <Cell large={1}>
                    <strong>Aplicar</strong>
                  </Cell>
                </Grid>

                {//
                // Listar Fundos
                //

                this.state.loading ? (
                  <div className="loading">
                    <i className="mdi mdi-timer-sand"></i> Carregando lista de
                    fundos...
                  </div>
                ) : (
                  this.state.funds.map(item => {
                    // Formatar da data
                    let quota_date = item.quota_date;
                    if (quota_date) {
                      quota_date = quota_date.split("-");
                      quota_date =
                        quota_date[2] +
                        "/" +
                        quota_date[1] +
                        "/" +
                        quota_date[0];
                    }
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
                            small={12}
                            medium={12}
                            large={4}
                            className={
                              "funds-risk-" +
                              item.specification.fund_risk_profile
                                .score_range_order
                            }
                          >
                            <p className="funds-title">
                              {item.simple_name}
                              {item.specification.is_qualified ? (
                                <span className="qualified">
                                  <label>
                                    Fundo para investidor qualificado
                                  </label>
                                  <i className="mdi mdi-star-circle"></i>
                                </span>
                              ) : null}
                            </p>
                            <span className="funds-type">
                              {item.specification.fund_type +
                                " | " +
                                item.specification.fund_class}
                            </span>
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={1}
                            className="mobile"
                          >
                            <strong>Data da cota</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={1}>
                            {quota_date}
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={1}
                            className="mobile"
                          >
                            <strong>Mês (%)</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={1}>
                            {profits_day}
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={1}
                            className="mobile"
                          >
                            <strong>2020 (%)</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={1}>
                            {profits_year}
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={1}
                            className="mobile"
                          >
                            <strong>12M (%)</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={1}>
                            {profits_m12}
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={2}
                            className="mobile"
                          >
                            <strong>Aplicação mínima (R$)</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={2}>
                            {
                              item.operability
                                .minimum_initial_application_amount
                            }
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={1}
                            className="mobile"
                          >
                            <strong>Prazo de resgate</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={1}>
                            {item.operability.retrieval_quotation_days_str
                              .length < 6 ? (
                              item.operability.retrieval_quotation_days_str
                            ) : (
                              <i className="mdi mdi-information-outline prazo-info"></i>
                            )}
                          </Cell>
                          <Cell
                            small={6}
                            medium={6}
                            large={1}
                            className="mobile"
                          >
                            <strong>Aplicar</strong>
                          </Cell>
                          <Cell small={6} medium={6} large={1}>
                            <i className="apply mdi mdi-reply"></i>
                          </Cell>
                        </Grid>
                      </div>
                    );
                  })
                )}
              </div>
            </Cell>
            {
              // Fitros Direita
            }
            <FiltersRight />
          </Grid>
          <Legenda />
        </div>
      </div>
    );
  }
}
