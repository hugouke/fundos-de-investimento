import React, { PureComponent } from "react";
import { Cell } from "react-foundation";

export default class FiltersRight extends PureComponent {
  render() {
    return (
      <Cell small={12} medium={12} large={3} className="filters-right">
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
    );
  }
}
