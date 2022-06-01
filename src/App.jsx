import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeeComponent from './pages/Page/Home';

import TeamComponent from './pages/Teams/TeamDetail';
import Header from './components/Header/Header';
import DetailEmployee from './pages/EmployeeDetail/EmployeeDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={'/home'} component={EmployeeComponent} />
        <Route exact path={'/team'} component={TeamComponent} />
        <Route exact path={'/employee'} component={EmployeeComponent} />
        <Route exact path={'/:id'} component={DetailEmployee} />
        <Route exact path={'/'} component={EmployeeComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
