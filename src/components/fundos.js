import API from "./api";

// Ordenar itens por estratégia
const sortByMainStrategy = function() {
  return function(x, y) {
    return x.specification.fund_main_strategy.name ===
      y.specification.fund_main_strategy.name
      ? 0
      : x.specification.fund_main_strategy.name >
        y.specification.fund_main_strategy.name
      ? 1
      : -1;
  };
};

const sortByMacroStrategy = function() {
  return function(x, y) {
    return x.specification.fund_macro_strategy.name ===
      y.specification.fund_macro_strategy.name
      ? 0
      : x.specification.fund_macro_strategy.name >
        y.specification.fund_macro_strategy.name
      ? 1
      : -1;
  };
};

// Puxar lista de fundos
export const getFunds = data =>
  API.get(
    "fund_detail_full.json?limit=10&offset=0&serializer=fund_detail_full"
  ).then(res => {
    res.data.sort(sortByMainStrategy());
    res.data.sort(sortByMacroStrategy());
    return res.data;
  });
