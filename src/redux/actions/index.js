import getApi from '../../services/getApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const RESOURCES_SENTENCE = 'RESOURCES_SENTENCE';
export const RESOURCES_DONE = 'REQUEST_COINSUCESS';
export const EXPENSES_SENTENCE = 'EXPENSES_SENTENCE';

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
