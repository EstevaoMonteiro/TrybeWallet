import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  conversionToReal = () => {
    const { expenses } = this.props;
    let amount = 0;
    expenses.forEach((elem) => {
      const sum = +elem.exchangeRates[elem.currency].ask * +elem.value;
      amount += sum;
    });
    return amount;
  };

  render() {
    const { email } = this.props;
    return (
      <form>
        <h2 data-testid="email-field">{ email }</h2>
        <div>
          <span data-testid="total-field">{ this.conversionToReal().toFixed(2) }</span>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </form>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
