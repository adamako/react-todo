import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, List, message, Popconfirm, Switch, Tag, Tooltip } from "antd";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, updateTodo } from "../services/TodoService";
import { Todo } from "../types/Todo";

type PropsType = {
  todo: Todo;
};

export const TodoItem = ({ todo }: PropsType) => {
  const queryClient = useQueryClient();

  const removeTodo = useMutation(deleteTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("todos");
      message.warn("Tâche supprimée");
    },
  });

  const updateStatus = useMutation(updateTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("todos");
      message.info("Tâche mise à jour");
    },
  });

  return (
    <List.Item
      key={todo.id}
      actions={[
        <Tooltip
          title={
            todo.completed
              ? "Marquer comme non terminer"
              : "Marquer comme terminer"
          }
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() =>
              updateStatus.mutate({
                ...todo,
                completed: !todo.completed,
              } as Todo)
            }
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title={"Etes vous sûr de vouloir supprimer ?"}
          onConfirm={() => removeTodo.mutate(todo.id!!)}
        >
          <Button className="remove-todo-button">X</Button>
        </Popconfirm>,
      ]}
      className={"list-item"}
    >
      <div className={"todo-item"}>
        <Tag color={todo.completed ? "cyan" : "red"} className={"todo-tag"}>
          {todo.title}
        </Tag>
      </div>
    </List.Item>
  );
};
