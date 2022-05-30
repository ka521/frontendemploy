import { FaPlusCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {
	Form,
	Select,
	Input,
	Button,
	Upload,
	Modal,
	DatePicker,
	notification,
	Alert,
	message,
	Space,
} from 'antd';
import {
	UploadOutlined,
	InboxOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
import EmployeeService from '../../service/EmployeeService';
import axios from 'axios';
import './HeadDetailContainer.scss';
import { useForm } from 'react-hook-form';
import TeamService from '../../service/TeamService';
import React from 'react';
import { useParams } from 'react-router-dom';

const HeadDetailContainer = () => {
	let { id } = useParams();

	const [employees, setemployees] = useState([]);

	const getEmployeeDetail = () => {
		EmployeeService.getEmployeeById(id).then((res) => {
			setemployees(res.data);
			reset(res.data);
		});
	};
	useEffect(() => {
		getEmployeeDetail();
	}, [onsubmit]);

	const [Team, setTeam] = useState([]);
	useEffect(() => {
		TeamService.getTeams().then((res) => setTeam(res.data));
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log({ ...data, employeeId: 'asdasd' });
		EmployeeService.updateEmployee(data).then((res) => getEmployeeDetail());
		
	};

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const openNotification = () => {
		message.success('Save Employee Success');
	};

	function someFunc() {
		openNotification();
		handleOk();

		// validate();
	}

	const deleteEmployee = async (id) => {
		if (window.confirm('Are you sure')) {
			await fetch('http://localhost:8080/api/employee/delete/' + id, {
				method: 'DELETE',
				header: {
					Accept: 'application/json',
					'Conten-type': 'application/json',
				},
			});
		}
	};

	return (
		<>
			<div className='head_container'>
				<div className='head_container__title'>
					<b>{employees.fullName}</b>
				</div>
				<div className='head_container__button'>
					<div
						className='head_container__button head_container__button--add'
						onClick={showModal}
					>
						<FaEdit />{' '}
					</div>
					<div
						className='head_container__button head_container__button--delete'
						onClick={() => deleteEmployee(`${id}`)}
					>
						<FaTrashAlt />{' '}
					</div>
				</div>
			</div>
			<Modal
				title='Update Employee'
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				{
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							Full Name Employee:
							<input
								type='text'
								{...register('fullName', {
									required: true,
									max: 255,
									maxLength: 80,
								})}
							/>
						</label>
						<label>
							Age Employee:
							<input
								type='number'
								{...register('age', { required: true, maxLength: 100 })}
							/>
						</label>
						<label>
							Address:
							<input type='text' {...register('address', { required: true })} />
						</label>
						<label>
							Phone number:
							<input
								type='tel'
								{...register('phone', { required: true, maxLength: 12 })}
							/>
						</label>
						<br></br>
						<label>
							Sex employee:
							<select {...register('sex', { required: true })}>
								<option value='Female'>Female</option>
								<option value='Male'>Male</option>
								<option value='Other'>Other</option>
							</select>
						</label>

						<label>
							Team:
							<select {...register('teamID', { required: true })}>
								{Team.map((el) => (
									<option value={el.no}>{el.name}</option>
								))}
							</select>
						</label>

						<br></br>
						<label>
							Money/hour:
							<input
								type='number'
								{...register('moneyPerHour', { required: true })}
							/>
						</label>
						<label>
							Start day:
							<input type='date' {...register('startDay', {})} />
						</label>
						<input type='submit' onClick={someFunc} />
					</form>
				}
			</Modal>
		</>
	);
};

export default HeadDetailContainer;
