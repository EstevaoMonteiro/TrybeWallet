import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailSentence } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      buttonDisable: true,
    }, () => {
      this.onInputChange();
    });
  };

  onInputChange = () => {
    const { email, password } = this.state;
    const maxLength = 6;
    const regex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+$/i;
    const sentence = email.match(regex)
    && password.length >= maxLength;
    this.setState({ buttonDisable: !sentence });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(emailSentence(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonDisable } = this.state;
    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
        >
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            value={ password }
            name="password"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ buttonDisable }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
