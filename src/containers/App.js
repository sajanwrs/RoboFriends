import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErroBoundry from "../components/ErrorBoundry";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    //Setting state
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  //Updating state
  componentDidMount() {
    //Fetching users from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onsearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    //Destructuring
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    //Ternary condition
    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onsearchChange} />
        <Scroll>
          <ErroBoundry>
            <CardList robots={filteredRobots} />
          </ErroBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
