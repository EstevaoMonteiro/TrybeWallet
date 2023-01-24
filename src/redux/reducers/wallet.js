import { RESOURCES_DONE, EXPENSES_SENTENCE, EXPENSES_DISABLED_BUTTON,
  EXPENSE_EDIT_SENTENCE, SENTENCE_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESOURCES_DONE:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES_SENTENCE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case EXPENSES_DISABLED_BUTTON:
    return {
      ...state,
      expenses: action.payload,
    };
  case SENTENCE_EDIT:
    return {
      ...state,
      edit: true,
      idToEdit: action.payload,
    };
  case EXPENSE_EDIT_SENTENCE:
    return {
      ...state,
      edit: false,
      expenses: [...action.payload],
    };

  default: return state;
  }
};
export default wallet;
