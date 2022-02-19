import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data.map((user) =>  ({ id: user.id, name: user.username, email: user.email}))
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("updateCredentials");
        }
      }
    );
  }

  render() {
    console.log(this.state.content)
    return (
      <div className="container">
        <header className="jumbotron">
           <h3>All Users:</h3>
        </header>
        
        {this.state.content.map(  
                (user) => (
                    <>
                    <p>
                      <strong>Name:</strong>{" "}
                        {user.name}
                    </p>
                    <p>
                      <strong>Id:</strong>{" "}
                        {user.id}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                        {user.email}
                    </p>
                    <br/>
                    <br/>
                    </>
               
                )
            )}
     
      </div>
    );
  }
}
