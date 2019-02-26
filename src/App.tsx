import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

const Info = () => <h2>🔎</h2>
const About = () => <h2>📚</h2>
const Home = () => <h2>🏡</h2>

const gracefullyDegrade = (e:
  React.MouseEvent<HTMLAnchorElement> |
  React.FormEvent<HTMLFormElement>) => {
  const target = e.nativeEvent.target;

  if (target instanceof HTMLAnchorElement && target.href) {
    window.location.href = target.href;
  }

  if (target instanceof HTMLFormElement && target.method === 'get') {
    let query: string[] = [];
    const iterator = new FormData(target).entries();
    while (true) {
      const { done, value } = iterator.next();
      if (done) break;
      const [key, val] = value;
      query.push(`${key}=${val}`);
    }
    window.location.search = '?' + query.join('&');
  }
}

const handleAndFail = (e:
  React.MouseEvent<HTMLAnchorElement> |
  React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    throw new Error("Couldn't do the thing on the webpage");
  } catch (err) {
    gracefullyDegrade(e);
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <NavLink to='/' onClick={handleAndFail}>🏡</NavLink>
              <NavLink to='/info'>🔎</NavLink>
              <NavLink to='/about'>📚</NavLink>
            </header>
            <Switch>
              <Route path='/info' component={Info} />
              <Route path='/about' component={About} />
              <Route component={Home} />
            </Switch>
            <form method="GET" onSubmit={handleAndFail} >
              <label> Label:
                <input name="form-submit" type="text" />
              </label>
              <button type="submit">submit</button>
            </form>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
