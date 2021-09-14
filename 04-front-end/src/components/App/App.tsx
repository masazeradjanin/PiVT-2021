import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import EventRegister from '../../api/EventRegister';
import api from '../../api/api';
import TopMenu from '../TopMenu/TopMenu';
import Furniture from '../Furniture/Furniture';

class ApplicationState {
  authorizedRole: "user" | "administrator" | "visitor" = "visitor";
}

export default class App extends React.Component {
  state: ApplicationState;

  constructor(props: any) {
    super(props);

    this.state = {
      authorizedRole: "visitor",
    };
  }
  componentDidMount() {
    EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));

    this.checkRole("user");
    this.checkRole("administrator");
  }

  componentWillUnmount() {
   
  }

  private authEventHandler(message: string) {
    console.log('Application: authEventHandler: ', message);

    if (message === "force_login" || message === "user_logout" || message === "administrator_logout") {
      return this.setState({ authorizedRole: "visitor" });
    }

    if (message === "user_login") {
      return this.setState({ authorizedRole: "user" });
    }

    if (message === "administrator_login") {
      return this.setState({ authorizedRole: "administrator" });
    }
  }

  private checkRole(role: "user" | "administrator") {
    api("get", "/auth/" + role + "/ok", role)
      .then(res => {
        if (res?.data === "OK") {
          this.setState({
            authorizedRole: role,
          });
          EventRegister.emit("AUTH_EVENT", role + "_login");
        }
      })
      .catch(() => {});
  }

  render() {
    return (
      <div>
        <BrowserRouter>        
          <TopMenu currentMenuType={this.state.authorizedRole} />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/furniture" component={Furniture} />
              <Route path="/contact" component={Home} />
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
