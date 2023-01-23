import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import Wallet from '../../pages/Wallet';

describe('Testando Login', () => {
  test('Teste de Renderização e se o texto estiver errado', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), 'texto@errado');
  });
});

describe('Testando Wallet', () => {
  test('Teste de Renderização', () => {
    renderWithRouterAndRedux(<Wallet />);
  });
});
