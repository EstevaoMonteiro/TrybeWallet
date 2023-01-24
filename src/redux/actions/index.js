import getApi from '../../services/getApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const RESOURCES_SENTENCE = 'RESOURCES_SENTENCE';
export const RESOURCES_DONE = 'REQUEST_COINSUCESS';
export const EXPENSES_SENTENCE = 'EXPENSES_SENTENCE';
export const EXPENSES_DISABLED_BUTTON = 'EXPENSES_DISABLED_BUTTON';
export const SENTENCE_EDIT = 'SENTENCE_EDIT';
export const EXPENSE_EDIT_SENTENCE = 'EXPENSE_EDIT_SENTENCE';

export const emailSentence = (email) => ({
  type: ADD_EMAIL,
  payload: {
    ...email,
  },
});

const resourcesSentence = () => ({
  type: RESOURCES_SENTENCE,
});

const resourcesDone = (currencies) => ({
  type: RESOURCES_DONE,
  payload: Object.keys(currencies),
});
export const editSentence = (edit) => ({
  type: SENTENCE_EDIT,
  payload: edit,
});

export const editExpenses = (expenses) => ({
  type: EXPENSE_EDIT_SENTENCE,
  payload: expenses,
});

export const acessApi = () => async (dispatch) => {
  dispatch(resourcesSentence());
  try {
    const currencies = await getApi();
    dispatch(resourcesDone(currencies));
  } catch (error) {
    dispatch(error);
  }
};

export const expensesSentence = async (dispatch, expense) => {
  const exchangeRates = await getApi();

  dispatch({
    type: EXPENSES_SENTENCE,
    payload: {
      ...expense,
      exchangeRates,
    },
  });
};

export const disabledButton = (payload) => ({
  type: EXPENSES_DISABLED_BUTTON,
  payload,
});
