import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, FormEvent } from "react";
import { Amplify, API, withSSRContext, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";
import { listTodos } from "../graphql/queries";
import { deleteTodo } from "../graphql/mutations";
import { TodoForm } from "../components/TodoForm";
import { Layout } from "../components/Layout";

import { NextPage } from "next";

import { createTodo } from "../graphql/mutations";
import { Todo, CreateTodoInput } from "../API";

import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

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

const useStyles = () =>
  makeStyles({
    table: {
      minWidth: 650,
    },
    form: {
      display: "flex"
    }
  });

const Todos: NextPage<Props> = ({ todos }) => {
  const [data, setData] = useState(todos);
  const [todo, setTodo] = useState("");
  const classes = useStyles();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload: CreateTodoInput = {
      description: todo || "",
    };
    const newData = await API.graphql(
      graphqlOperation(createTodo, {
        input: payload,
      })
    );
    setTodo("");
    const newArray = [...data, newData.data.createTodo];
    setData(newArray);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    await API.graphql(
      graphqlOperation(deleteTodo, {
        input: { id },
      })
    );
    const newArray = data.filter((d) => d.id !== id);
    setData(newArray);
  };

  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl margin="normal" className={classes.form}>
          <InputLabel htmlFor="my-input">投稿</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => handleChange(e)} value={todo} />
          <Button color="primary" type="submit">
            投稿
          </Button>
          {/* <FormHelperText id="my-helper-text">あああああ</FormHelperText> */}
        </FormControl>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">内容</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((todo) => (
              <TableRow key={todo.id} hover="true">
                <TableCell component="th" scope="row">
                  {todo.id}
                </TableCell>
                <TableCell align="right">{todo.description}</TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={() => handleDeleteTodo(todo.id)}>
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Todos;
