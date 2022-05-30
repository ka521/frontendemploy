import axios from "axios";
const Advances_API_BASE_URL = "http://localhost:8080/api/v4";
class AdvancesService {
 createAdvances = (Advances) => {
  return axios.post(Advances_API_BASE_URL+'/advances', Advances);
};

 getAdvancesById = (AdvancesId) => {
  return axios.get(Advances_API_BASE_URL +'/advances/' + AdvancesId);
};

 deleteAdvances = (AdvancesId) => {
  return axios.delete(Advances_API_BASE_URL + "/" + AdvancesId);
};
}

export default new AdvancesService ()
