import { Col, Layout, message, Row, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTodo, getAllTodos } from "../services/TodoService";
import "../styles/todoStyle.css";
import { Todo } from "../types/Todo";
import { TodoForm } from "./TodoForm";
import { TodoTab } from "./TodoTab";

export const TodoList = () => {
  const queryClient = useQueryClient();
  const allTodos = useQuery("todos", getAllTodos);
  const completedTodos = useQuery("completedTodos", async () => {
    const data: Todo[] = await getAllTodos();
    return data.filter((todo) => todo.completed);
  });
  const activeTodos = useQuery("activeTodos", async () => {
    const data: Todo[] = await getAllTodos();
    return data.filter((todo) => !todo.completed);
  });

  //Mutations
  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleFormSubmit = async (todo: Todo) => {
    await mutation.mutate(todo);
    message.success("Tâche ajoutée");
  };

  return (
    <Layout className={"layout"}>
      <Content style={{ padding: "0 50px" }}>
        <div className={"todoList"}>
          <Row>
            <Col span={14} offset={5}>
              <h1>Mes tâches</h1>
              <TodoForm onFormSubmit={handleFormSubmit} />
              <br />
              <Tabs defaultActiveKey={"all"}>
                <Tabs.TabPane tab={"Tout"} key={"all"}>
                  <TodoTab todos={allTodos.data as Todo[]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={"Actif"} key={"active"}>
                  <TodoTab todos={activeTodos.data as Todo[]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={"Terminé"} key={"complete"}>
                  <TodoTab todos={completedTodos.data as Todo[]} />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
