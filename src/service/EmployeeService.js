import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employee";


const Statisc_API_BASE_URL = "http://localhost:8080/api/statistic/";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL+'/get-employee');
    }
 

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+'/create', employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL +'/getbyid/'  + employeeId);
    }

    getStatisticById(statisticId){
        return axios.get( Statisc_API_BASE_URL + statisticId);
    }

  

    updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASE_URL+'/update/' + employee.no, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService ()