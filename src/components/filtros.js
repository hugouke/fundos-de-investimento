// Busca
export const searchChange = (obj, event) => {
  const value = event.target.value.toLowerCase();
  let funds = obj.state.all_funds,
    result = [];
  result = funds.filter(item => {
    return item.simple_name.toLowerCase().search(value) !== -1;
  });
  obj.setState({ funds: result });
};

// Filtro: Aplicação mínima
export const minimumApplicationChange = (obj, event) => {
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

  let funds = obj.state.all_funds,
    result = [];
  result = funds.filter(item => {
    return (
      item.operability.minimum_initial_application_amount <=
      parseInt(value.replace(".", ""))
    );
  });

  obj.setState({
    minimum_application: value,
    minimum_application_bg: bg,
    funds: result
  });
};

// Filtro: Prazo de resgate
export const retrievalDaysChange = (obj, event) => {
  const value = event.target.value;
  const bg = (event.target.value / 30) * 100 + "%";

  let funds = obj.state.all_funds,
    result = [];
  result = funds.filter(item => {
    return (
      parseInt(item.operability.retrieval_quotation_days) <= parseInt(value)
    );
  });

  obj.setState({
    retrieval_days: value,
    retrieval_days_bg: bg,
    funds: result
  });
};

// Filtro: Perfil de risco do fundo
export const fundRiskChange = (obj, event) => {
  const sizes = [0, 0, 7, 15, 20, 30, 40, 50, 55, 65, 75, 80, 90];
  const value = event.target.value;
  let line = sizes[event.target.value];
  let funds = obj.state.all_funds,
    result = [];
  result = funds.filter(item => {
    return (
      parseInt(item.specification.fund_risk_profile.score_range_order) <=
      parseInt(value)
    );
  });

  obj.setState({
    fund_risk: value,
    fund_risk_line: line + "%",
    funds: result
  });
};
