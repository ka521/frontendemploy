import './EmployeeDetail.scss';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';

import {
	Tabs,
	Row,
	Col,
	Input,
	Upload,
	Modal,
	Form,
	Avatar,
	Image,
	Button,
} from 'antd';
import Working from '../../components/Working/Working';

import Advances from '../../components/Advances/Advances';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Statistics from '../../components/Statistics/Statistics';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import {
	ExclamationCircleOutlined,
	AntDesignOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import moment from 'moment';

import { toast } from 'react-toastify';
const { confirm } = Modal;

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

function EmployeeDetail(props) {

	const { render, renderPage } = props;
	function handleEdit() {}

	const { id } = useParams();

	const [employees, setemployees] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [valueForm, setvalueForm] = useState({
		fullname: '',
		age: '',
		address: '',
		gender: '',
		phonenumber: '',
		startday: '',
		totalhours: '',
		moneyperhour: '',
		employeeteam: '',
		ImageUrl: '',
	});
	const history = useHistory();
	
	useEffect(() => {
		async function getEmployee() {
		
			const response = await axios.get(
				`http://localhost:8080/api/employees/getbyid/${id}`
			);
			setemployees(response.data);

			setvalueForm({
				fullname: response.data.fullName,
				age: response.data.age,
				address: response.data.address,
				gender: response.data.gender,
				phonenumber: response.data.phoneNumber,
				startday: moment(response.data.startDay).utc().format('YYYY/MM/DD'),
				totalhours: response.data.totalHours,
				moneyperhour: response.data.moneyPerHour,
				employeeteam: response.data.teamId,
				ImageUrl: response.data.imageURL,
			});

			setIsLoading(false);
			console.log('response', response.data);
		}
		getEmployee();
	}, [id, render]);

	function handleDelete(id) {
		console.log(id);
		function showPromiseConfirm(id) {
			console.log('data in modal', id);
			confirm({
				title: 'Are you sure to delete employee ?',
				icon: <ExclamationCircleOutlined />,
				
				async onOk() {
					try {
						const response = await axios.delete(
						
							`http://localhost:8080/api/employees/delete/${id}`
						);
						console.log(response);
						toast.success(response.data.message);
						history.push('/employee');
					} catch (error) {
						toast.error(error);
					}
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
					}).catch(() => console.log('Oops errors!'));
				},
				onCancel() {},
			});
		}
		showPromiseConfirm(id);
	}



	const {
		address,
		age,
		fullName,
		gender,
	
		imageURL,
		moneyPerHour,
		phoneNumber,
		startDay,
		teamId,
		totalHours,
	} = employees;


	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};

	function onChangeFormUpload(e) {
		console.log(e.file.originFileObj);
		if (e.fileList.length > 0) {
			var src = URL.createObjectURL(e.file.originFileObj);
			console.log('Lofg src', src);
		}
		setvalueForm({
			...valueForm,
			image: e.file.originFileObj,
		});
	}

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	function onChangeForm(e) {
		setvalueForm({
			...valueForm,
			[e.target.name]: e.target.value,
		});
	}

	function resetForm() {
		setvalueForm({
			fullname: '',
			age: '',
			address: '',
			gender: '',
			phonenumber: '',
			startday: '',
			totalhours: '',
			moneyperhour: '',
			employeeteam: '',
		});
	}

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		console.log(valueForm);
		
		const isEmpty = Object.values(valueForm).every((x) => x !== '');
		console.log(isEmpty);
		const form = new FormData();
		if (isEmpty) {
			console.log('value fornm', valueForm);
			console.log('đủ trường thì nhảy vào đây');
			if (valueForm.image) {
				form.append('fullName', valueForm.fullname);
				form.append('age', valueForm.age);
				form.append('address', valueForm.address);
				form.append('gender', valueForm.gender);
				form.append('phoneNumber', valueForm.phonenumber);
				form.append('moneyPerHour', valueForm.moneyperhour);
				form.append('startDay', valueForm.startday);
				form.append('totalHours', valueForm.totalhours);
				form.append('file', valueForm.image);

				form.append('employeeTeam', valueForm.employeeteam);
				console.log('có ảnh');
			} else {
				form.append('fullName', valueForm.fullname);
				form.append('age', valueForm.age);
				form.append('address', valueForm.address);
				form.append('gender', valueForm.gender);
				form.append('phoneNumber', valueForm.phonenumber);
				form.append('moneyPerHour', valueForm.moneyperhour);
				form.append('startDay', valueForm.startday);
				form.append('totalHours', valueForm.totalhours);
				// form.append('file', '');
				form.append('employeeTeam', valueForm.employeeteam);
				console.log('ko có ảnh');
			}
			for (var pair of form.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}
			try {
				const response = await axios.put(
					`http://localhost:8080/api/employees/update/${id}`,
					form,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				console.log('response sau update', response);
				toast.success(response.data.message);
				renderPage();
				setIsModalVisible(false);
				resetForm();
			} catch (error) {
				console.log(error);
			}
		} else {
		
			toast.error('Vui lòng điền đầy đủ các trường');
			console.log('văng');
			onFinish();
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	if (isLoading) {
		console.log(isLoading);
	} else {
		return (
			<>
				<Modal
					title='Edit Employee'
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
					destroyOnClose={true}
				>
					<Avatar
						src={valueForm.ImageUrl}
						shape="square" size="large"
						icon={<UserOutlined />}
					/>
				
					<Form
						{...formItemLayout}
					
						autoComplete='off'
						onFinish={onFinish}
					>
						<Row>
							<Col span={12}>
								<Form.Item label='Full name'>
									<Input
										
										onChange={onChangeForm}
										name='fullname'
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Please input Full Name!',
											},
										]}
										value={valueForm.fullname}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label='Address'>
									<Input
										
										onChange={onChangeForm}
										name='address'
										value={valueForm.address}
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Please input Full Name!',
											},
										]}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<Form.Item label='Start day'>
									<Input
										disabled
										
										name='startday'
										value={moment(valueForm.startday)
											.utc()
											.format('DD/MM/YYYY')}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label='Money Per Hour'>
									<Input
										disabled
										
										name='moneyperhour'
										value={valueForm.moneyperhour}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<Form.Item
									
									label='Phone Number'
									
								>
									<Input
										
										onChange={onChangeForm}
										name='phonenumber'
										value={valueForm.phonenumber}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label='Total hours'>
									<Input
										disabled
										
										name='fullname'
										value={valueForm.totalhours}
									/>
								</Form.Item>
							</Col>
						</Row>
						<div className='upload-picture'>
							<Row>
								<Col span={24}>
									<Form.Item label='Upload Image'>
										<Upload
											listType='picture'
											action={''}
											accept='.png,.jpeg'
											onChange={onChangeFormUpload}
											customRequest={dummyRequest}
										>
											<Button icon={<UploadOutlined />}>Click to upload</Button>
										</Upload>
									</Form.Item>
								</Col>
							</Row>
						</div>
					</Form>
				</Modal>
				<div className='head_container'>
					<div className='head_container__title'>{fullName}</div>
					<div className='head_container__button'>
						<div
							className='head_container__button head_container__button--add'
							onClick={showModal}
						>
							<FaEdit />{' '}
						</div>
						<div
							className='head_container__button head_container__button--delete'
							onClick={() => handleDelete(id)}
						>
							<FaTrashAlt />{' '}
						</div>
					</div>
				</div>
				<Row className='padding-top'>
					<Col className='gutter-row' span={5}>
						<div className='employee-detail__few-info'>
							<div className='employee-detail__img'>
								<img src={imageURL} alt={'anh hài'} />
								<div className='flex__out'>
									<div className='flex__in'>
										<div className='info-tag tag--no'>No :{id}</div>
										<div className='info-tag tag--age'>Age:{age}</div>
									</div>

									<div className='info-tag tag--sex'>Sex:{gender}</div>
								</div>
							</div>
						</div>
					</Col>
					<Col className='gutter-row' span={1}>
						{' '}
					</Col>
					<Col className='gutter-row employee-detail' span={18}>
						<div className='employee-detail__information carrd-container'>
							<Tabs type='card' defaultActiveKey='1' onChange={callback}>
								<TabPane tab='INFORMATION' key='information'>
									<div className='head_container'>
										

										<div className='head_container__title'>
											<b>INFORMATION</b>
										</div>
									</div>

									<div className='info-container'>
										<Row gutter={16}>
											<Col className='gutter-row' span={12}>
												<div className='info-box'>
													Start day :{' '}
													{moment(employees.startDay)
														.utc()
														.format('DD/MM/YYYY')}
												</div>
											</Col>
											<Col className='gutter-row' span={12}>
												<div className='info-box'>
													Team : {employees.teamName}
												</div>
											</Col>
											<Col className='gutter-row' span={12}>
												<div className='info-box'>
													Address :{employees.address}
												</div>
											</Col>
											<Col className='gutter-row' span={12}>
												<div className='info-box'>
													Salary Per hour :{employees.moneyPerHour}$
												</div>
											</Col>
										</Row>
									</div>
								</TabPane>
								<TabPane tab='WORKING' key='working'>
									<Working name='haha' employees={employees} />{' '}
								</TabPane>
								<TabPane tab='ADVANCES' key='advances'>
									<Advances name='haha' employees={employees} />{' '}
								</TabPane>
								<TabPane tab='STATISTICS' key='statistics'>
									<Statistics name='haha' employees={employees} />{' '}
								</TabPane>
							</Tabs>
						</div>
					</Col>
				</Row>
			</>
		);
	}
}
export default EmployeeDetail;
