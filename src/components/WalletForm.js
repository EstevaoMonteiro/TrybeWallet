import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acessApi, expensesSentence } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(acessApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { id } = this.state;
    const newId = id + 1;

    expensesSentence(dispatch, this.state);

    this.setState({
      id: newId,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <div>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map((element, index) => (
            <option
              key={ index }
              value={ element }
            >
              { element }
            </option>
          ))}
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
