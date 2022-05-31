import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import swal from 'sweetalert';

export default function TeamComponent() {
	const [employees, SetEmployees] = useState([]);
	const [teams, SetTeams] = useState([]);
	const [employeesTeam, setEmployeesTeam] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState({});
	const [team, setTeam] = useState({});

	const fetchData = async () => {
		try {
			const res = await Promise.all([
				axios.get('http://localhost:8080/api/employees/list'),
				axios.get('http://localhost:8080/api/team/listTeam'),
			]);
			const employees = res[0].data;
			const teams = res[1].data;
			await employees.forEach((employee) => {
				for (let i = 0; i < teams.length; i++) {
					if (employee.teamName === teams[i].name) {
						employee.teamName = teams[i].name;
					}
				}
			});
			await SetEmployees(employees);
			await SetTeams(teams);
			await setEmployeesTeam(
				employees.filter((employee) => employee.teamName === teams[0].name)
			);
			await setSelectedTeam(teams[0]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const renderTeams = () => {
		return teams.map((team, index) => {
			return (
				<tr key={index}>
					<td scope='row'>{index + 1}</td>
					<td>{team.name}</td>
					<td className='text-center'>
						<button
							className='btn btn-outline p-0'
							onClick={() => {
								setSelectedTeam(team);
								setEmployeesTeam(
									employees.filter(
										(employee) => employee.teamName === selectedTeam.name
									)
								);
							}}
						>
							<i className='fa-solid fa-clipboard-list'></i>
						</button>
					</td>
				</tr>
			);
		});
	};

	const renderNameTeamSelected = () => {
		return `Result all employee team ${selectedTeam.name} - Total ${employeesTeam.length} employees`;
	};

	/*--------------------------HANDLE ADD TEAM------------------------------------------------ */
	const renderEmployeesSelected = () => {
		return employeesTeam.map((employee, index) => {
			return (
				<tr key={index}>
					<td scope='row'>{index + 1}</td>
					<td>{employee.fullName}</td>
					<td>{employee.phoneNumber}</td>
					<td>{employee.address}</td>
					<td>{employee.gender}</td>
				</tr>
			);
		});
	};

	const handleChangeInput = (e) => {
		setTeam({
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const addTeam = async () => {
				const res = await axios.post(
					'http://localhost:8080/api/team/create',
					team
				);
			};
			addTeam();
			swal({
				title: 'Good job!',
				text: 'Created a new team!',
				icon: 'success',
				button: 'Yahoooo!',
			});
			fetchData();
		} catch (error) {
			console.log(error);
		}
	};

	/*-------------------------------------------------------------------------- */
	return (
		<div className='container mt-3'>
			<div className='d-flex justify-content-between'>
				<h3 className='display-5'>Team</h3>
				<div>
					<button
						className='btn btn-outline p-0 mr-3'
						data-toggle='modal'
						data-target='#exampleModal'
					>
						<PlusCircleOutlined style={{ fontSize: '24px', color: 'black' }} />
					</button>
				</div>
			</div>
			<div>
				<div
					className='modal fade'
					id='exampleModal'
					tabIndex={-1}
					role='dialog'
					aria-labelledby='exampleModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header bg-primary text-white'>
								<h5 className='modal-title' id='exampleModalLabel'>
									Add a new Team
								</h5>
							</div>
							<form onSubmit={handleSubmit} className='modal-body'>
								<div className='form-group row'>
									<div className='col'>
										<small className='form-text text-muted'>Team Name *</small>
										<input
											className='form-control'
											name='name'
											required
											type='text'
											placeholder='Enter a new team'
											onChange={handleChangeInput}
										/>
									</div>
								</div>
								<div className='modal-footer'>
									<button
										type='submit'
										className='btn btn-outline'
										data-dismiss='modal'
									>
										CANCEL
									</button>
									<button type='submit' className='btn btn-outline'>
										SUBMIT
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div className='row mt-3'>
				<div className='col-4'>
					<p>Total {teams.length} teams</p>
					<table className='table table-striped mt-3'>
						<thead>
							<tr>
								<th>No</th>
								<th>Name Team</th>
								<th className='text-center'>Detail</th>
							</tr>
						</thead>
						<tbody>{renderTeams()}</tbody>
					</table>
				</div>
				<div className='col-8'>
					<p>{renderNameTeamSelected()}</p>
					<table className='table table-striped mt-3'>
						<thead>
							<tr>
								<th>No</th>
								<th>FullName</th>
								<th>Phone</th>
								<th>Address</th>
								<th>Sex</th>
							</tr>
						</thead>
						<tbody>{renderEmployeesSelected()}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
