import { Todo } from "../types/Todo";

const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const getAllTodos = () => {
  console.log("125");
  return fetch(baseUrl)
    .then((res) => res.json())
    .catch((e) => JSON.stringify(e));
};

export const getTodo = (id: string) => {
  return fetch(`${baseUrl}/${id}`)
    .then((res) => res.json())
    .catch((e) => JSON.stringify(e));
};

export const createTodo = (todo: Todo) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed ?? false,
    }),
  })
    .then((res) => res.json())
    .catch((e) => JSON.stringify(e));
};

export const updateTodo = (todo: Todo) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }),
  })
    .then((res) => res.json())
    .catch((e) => JSON.stringify(e));
};

export const deleteTodo = (id: string) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((e) => JSON.stringify(e));
};
