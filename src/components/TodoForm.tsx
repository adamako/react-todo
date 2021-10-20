import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { Todo } from "../types/Todo";

type PropsType = {
  onFormSubmit?: (data: Todo) => void;
};
export const TodoForm = ({ onFormSubmit }: PropsType) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    if (onFormSubmit) {
      onFormSubmit({
        title: form.getFieldValue("title"),
        completed: false,
      });
    }

    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout={"horizontal"}
      className={"todo-form"}
    >
      <Row gutter={20}>
        <Col sm={24} xs={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "Ce champs est obligatoire" }]}
          >
            <Input placeholder={"Entrer une tâche"} />
          </Form.Item>
        </Col>
        <Col sm={24} xs={24} md={7} lg={5} xl={4}>
          <Button type={"primary"} htmlType={"submit"} block>
            <PlusCircleFilled />
            Ajouter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
