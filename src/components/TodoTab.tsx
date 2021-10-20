import { List } from "antd";
import React from "react";
import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

type PropsType = {
  todos: Todo[];
};
export const TodoTab = ({ todos }: PropsType) => {
  return (
    <>
      <List
        locale={{ emptyText: "Aucune tâche prévue " }}
        dataSource={todos}
        renderItem={(todo) => <TodoItem todo={todo} />}
        pagination={{ position: "bottom", pageSize: 10 }}
      />
    </>
  );
};
