import React from "react";
import { FormEvent } from "react";
import { createTodo } from "../graphql/mutations";
import { Todo, CreateTodoInput } from "../API";
import { API, graphqlOperation } from "aws-amplify";

interface State {
  todo: Todo;
}

export class TodoForm extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      todo: {
        __typename: "Todo",
        description: "",
      },
    };
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ todo: { __typename: "Todo", description: event.currentTarget.value } });
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload: CreateTodoInput = {
      description: this.state.todo.description || "",
    };
    await API.graphql(
      graphqlOperation(createTodo, {
        input: payload,
      })
    );
    this.setState({ todo: { __typename: "Todo", description: "" } });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.todo.description} onChange={this.handleChange} />
        <input type="submit" />
      </form>
    );
  }
}
