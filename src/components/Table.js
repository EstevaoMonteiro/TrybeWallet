import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disabledButton, editSentence } from '../redux/actions';

class Table extends Component {
  isDisabled = (item) => {
    const { expenses, dispatch } = this.props;
    const diference = (index) => index.id !== item;
    const element = expenses.filter(diference);
    dispatch(disabledButton(element));
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {
            expenses.map((item) => {
              const { id, description,
                tag, method, value, currency, exchangeRates } = item;
              const swap = exchangeRates[currency].ask;
              const multiple = value * exchangeRates[currency].ask;
              const index = exchangeRates[currency].name;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{(+value).toFixed(2)}</td>
                  <td>{currency}</td>
                  <td>{(+swap).toFixed(2)}</td>
                  <td>{(+multiple).toFixed(2)}</td>
                  <td>{index}</td>
                  <td>
                    <button
                      type="submit"
                      data-testid="edit-btn"
                      onClick={ () => dispatch(editSentence(id)) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      value={ id }
                      onClick={ () => { this.isDisabled(id); } }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
