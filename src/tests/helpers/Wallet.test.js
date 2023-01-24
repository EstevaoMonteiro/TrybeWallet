import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';
import App from '../../App';
import WalletForm from '../../components/WalletForm';

describe('Testando Form', () => {
  test('Testa email, senha, botão, descrição e moeda.', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const email = screen.getByRole('textbox');
    const entrar = screen.getByRole('button', { name: /entrar/i });
    const password = screen.getByTestId(/password-input/i);

    userEvent.type(email, 'texto@correto.com');
    userEvent.type(password, '000000');
    userEvent.click(entrar);

    const coin = screen.getByText(/brl/i);
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const textBox = screen.getByRole('textbox');

    expect(coin).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
    expect(textBox).toBeInTheDocument();
  });

  test(' Testa email, senha, botões adicinar despesa', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const entrar = screen.getByRole('button', { name: /entrar/i });
    const password = screen.getByTestId(/password-input/i);

    userEvent.type(email, 'texto@correto.com');
    userEvent.type(password, '000000');
    userEvent.click(entrar);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');

    userEvent.type(value, 50);
    userEvent.type(description, 'cinquenta');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpenseButton);
    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
  });
});
