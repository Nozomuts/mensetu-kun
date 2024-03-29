import { ActionTypes, IQuestion } from "./types";
import { Dispatch } from "redux";
import { questionsTable } from "../../db";
import { v4 as uuidV4 } from "uuid";

export const createQuestion = ({
  ...question
}: Omit<IQuestion, "id">) => async (dispatch: Dispatch) => {
  try {
    const id = uuidV4();
    await questionsTable.put({ id, ...question });
    dispatch({
      type: ActionTypes.CREATE_QUESTION,
      payload: { id, ...question },
    });
  } catch {
    alert("質問の追加に失敗しました");
  }
};

export const readQuestions = () => async (dispatch: Dispatch) => {
  try {
    const questions = await questionsTable.toArray();
    dispatch({
      type: ActionTypes.READ_QUESTIONS,
      payload: questions,
    });
  } catch {
    alert("質問の読み込みに失敗しました");
  }
};

export const updateQustion = (
  id: string,
  { ...question }: Partial<Omit<IQuestion, "id">>
) => async (dispatch: Dispatch) => {
  try {
    await questionsTable.update(id, question);
    dispatch({
      type: ActionTypes.UPDATE_QUESTION,
      payload: { id, ...question },
    });
  } catch {
    alert("質問の変更に失敗しました");
  }
};

export const deleteQuestion = (id: string) => async (dispatch: Dispatch) => {
  try {
    await questionsTable.delete(id);
    dispatch({
      type: ActionTypes.DELETE_QUESTION,
      payload: id,
    });
  } catch {
    alert("質問の削除に失敗しました");
  }
};

export const deleteAllQuestion = () => async (dispatch: Dispatch) => {
  if (!confirm("全ての質問を削除しますか？")) {
    return;
  }
  try {
    await questionsTable.clear();
    dispatch({
      type: ActionTypes.DELETE_ALL_QUESTIONS,
    });
  } catch {
    alert("質問の全削除に失敗しました");
  }
};
