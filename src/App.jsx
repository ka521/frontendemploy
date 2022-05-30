import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeeManagerComponent from './pages/Page/Home';

import TeamComponent from './pages/Teams/TeamDetail';
import HeaderHome from './components/Header/Header';
import DetailEmployee from './pages/EmployeeDetail/EmployeeDetail';

function App() {
  return (
    <BrowserRouter>
      <HeaderHome />
      <Switch>
        <Route exact path={'/home'} component={EmployeeManagerComponent} />
        <Route exact path={'/team'} component={TeamComponent} />
        <Route exact path={'/employee'} component={EmployeeManagerComponent} />
        <Route exact path={'/:id'} component={DetailEmployee} />
        <Route exact path={'/'} component={EmployeeManagerComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
