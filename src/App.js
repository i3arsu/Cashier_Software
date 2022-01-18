import './App.css'
import React from "react";
import { observer } from "mobx-react-lite"
import LoginForm from "./components/LoginForm";
import submitButton from "./components/submitButton";
import {render} from "react-dom";
import async from "async";
import UserStore from "./UserStore";
import SubmitButton from "./components/submitButton";


class App extends React.Component {

    async componentMounted() {
        try {
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();


            if (result && result.success) {

                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;

            } else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        } catch (e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async Logout() {
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();


            if (result && result.success) {

                UserStore.isLoggedIn = false;
                UserStore.username = '';
            }
        } catch (e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;

        }
    }

    render() {
        if (UserStore.loading) {
            return (
                <div className="app">
                    <div className="container">
                        Loading Please wait
                    </div>
                </div>
            );
        }
        else {
            if (UserStore.isLoggedIn) {
                return (
                    <div className="app">
                        <div className="container">
                            Welcome {UserStore.username}

                            <SubmitButton
                                text={'Log out'}
                                disabled={false}
                                onClick={() => this.Logout()}
                            />

                        </div>
                    </div>
                );
            }
            return(
                <div className="app">
                    <div className="containder">
                        <SubmitButton
                            text={'Log out'}
                            disabled={false}
                            onClick={() => this.Logout()}
                        />

                        <LoginForm />

                    </div>
                </div>
            );
        }

    }
}

export default App;
