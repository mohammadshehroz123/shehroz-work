import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LDClient from 'ldclient-js'

const isNewer = (a, b) => Date.parse(a.added) < Date.parse(b.added)

class App extends Component {
  constructor() {
    super()
    this.state = {
      showFeature: false,
      team_members: [
        { name: "shehroz"},
        { name: "qasim"},
        { name: "ibrar"}
      ]
    }
  }
  componentDidMount() {
    var user = {
      "key": "aa0ceb"
    };

    this.ldclient = LDClient.initialize('6135c85efc74a850eec29f6e', user)
    this.ldclient.on('ready', this.onLaunchDarklyUpdated.bind(this))
  }

  onLaunchDarklyUpdated() {
    const result = this.ldclient.variation("shehroz-test-flag") || false;
    this.setState({
      showFeature: result
    })
  }


  render() {
    let { team_members } = this.state;
    if (!this.state.showFeature) {
      return <div className="App">Loading....</div>
    }
    else {
      return (
        <div>
          <h1>Launch Darkly - Samply Flag Task</h1>
          <ul>
            {this.state.team_members.map( (team_member, key) => {
              return <li> { team_member.name } </li>
            })}
          </ul>
        </div>
      )
    }
  }
}

export default App;
