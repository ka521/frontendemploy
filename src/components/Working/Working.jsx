import './Working.scss';
import 'antd/dist/antd.css';
import { Form, Select, Input, Button, Upload, Modal, DatePicker,notification,Alert,message,Space  } from 'antd';
import { Table, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useRef  } from 'react'
import WorkService from '../../service/WorkService';
import { FaPlusCircle, FaTrashAlt,FaEdit } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import EmployeeService from '../../service/EmployeeService';

function Working(props) {

	console.log("CZXCZXCXZC",props.employees.no)

	// type Props = {
	//     some?: any,
	//     style?: string,
	// };
	const columns = [
		{
			title: 'No',
			dataIndex: 'id',
			key: 'key',
		},
		{
			title: 'Date',
			dataIndex: 'start',
			key: 'date',
		},
		{
			title: 'Hour',
			dataIndex: 'hour',
			key: 'hour',
		},
		{
			title: 'Option',
			key: 'option',
			render: (piece) => (
				<Space size='middle'>
					<div
						onClick={() => deleteEmployee(`/${piece.id}`)}
						// onClick={() => console.log(piece.key)}
						// className='head_container__button head_container__button--add'
						// onClick={showModal}
					>
						<FaTrashAlt />
					</div>
				</Space>
			),
		},
	];


	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const getWork = () => {
		WorkService.getWorkById(id).then(res => {     
			setworking(res.data)
		}); 
	}
	let {id} = useParams();
	const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
	const [working, setworking] = useState([]);
	const  onSubmit =async data => {
		await WorkService.createWork({...data,employeeId:props.employees.no}).then(res => getWork())
	}

	useEffect(() => {		
	
		getWork();
	 
	       
	}, [])

	const openNotification = () => {
		message.success('Save Employee Success');
	};
	function someFunc() {
		openNotification();
		handleOk();

		// validate();
	}


	const deleteEmployee= (id)=>{
		if(window.confirm('Are you sure')){
			fetch('http://localhost:8080/api/working/delete'+id,{
		
		method:'DELETE',
		header:{'Accept':'application/json',
		'Conten-type':'application/json'}
		
		
			})
		}
		  }

	
	
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => {
		setIsModalVisible(true);
	};


	return (
		<>
							<div className='head_container'>
<div className='head_container__title'><b>WORKING</b></div>
<div className='head_container__button'>
<div
className='head_container__button head_container__button--add'
onClick={showModal}
>
<FaPlusCircle />{' '}
</div>				
</div>
</div>
<Modal
				title='Add New Work'
				visible={isModalVisible}
				footer={null}
				onCancel={handleCancel}
		
			>	



			{ <form   onSubmit={handleSubmit(onSubmit)}
			
				>
 	  <label>Money/hour:
      <input type="number"  {...register("hour", {required: true})} />
      </label>
	  <label>Start day:
	  <input type="date"  {...register("start", {})} />
</label>
<input type="submit" onClick={someFunc}/>
    </form> }
			</Modal>
			<div className='working-container'>
				<Table columns={columns} dataSource={working} footer={false}/>
			</div>
		</>
	);
}

export default Working;
