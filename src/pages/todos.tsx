import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Amplify, API, withSSRContext, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";
import { listTodos } from "../graphql/queries";
import { deleteTodo } from "../graphql/mutations";
import { Todo } from "src/API";
import { TodoForm } from "../components/TodoForm";
import { Layout } from "../components/Layout";

import { NextPage } from "next";

Amplify.configure({ ...awsExports, ssr: true });

type Props = {
  todos: Todo[];
};

export const getServerSideProps = async (context: any) => {
  const { API } = withSSRContext(context);
  const response = await API.graphql({ query: listTodos });
  return {
    props: {
      todos: response.data.listTodos.items,
    },
  };
};

const handleDeleteTodo = async (id: string): Promise<void> => {
  await API.graphql(
    graphqlOperation(deleteTodo, {
      input: { id },
    })
  );
};

const Todos: NextPage<Props> = ({ todos }) => {
  return (
    <Layout>
      <TodoForm />
      <div className="">
        <ul>
          {todos.map((p) => (
            <li>
              <p>{p.createdAt}</p>
              <p>{p.description}</p>
              <button onClick={() => handleDeleteTodo(p.id || "")}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Todos;
