import { answersReducer } from "./answers/reducers";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { questionsReducer } from "./questions/reducers";

export type IStore = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
