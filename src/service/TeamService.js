import axios from "axios";

const Team_API_BASE_URL = "http://localhost:8080/api/team";

const getTeams = () => {
  return axios.get(Team_API_BASE_URL+'/list');
};

const createTeam = (Team) => {
  return axios.post(Team_API_BASE_URL+'/insert', Team);
};







export default {

  getTeams,

  createTeam,

};
