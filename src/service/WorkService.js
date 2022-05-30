import axios from "axios";

const Work_API_BASE_URL = "http://localhost:8080/api/working";
class WorkService {

getWorks (){
  return axios.get(Work_API_BASE_URL);
};


createWork(Work){
  return axios.post(Work_API_BASE_URL+'/works', Work);
}

getWorkById(WorkId){
  return axios.get(Work_API_BASE_URL +'/works/'  + WorkId);
}


}
export default new WorkService ()
