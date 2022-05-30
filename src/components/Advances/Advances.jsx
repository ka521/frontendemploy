import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import './Advances.scss';
import 'antd/dist/antd.css';
import { Table, Tag } from 'antd';
import AdvancesService from '../../service/AdvancesService';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useRef  } from 'react'
import { Form, Select, Input, Button, Upload, Modal, DatePicker,notification,Alert,message,Space  } from 'antd';
import { useForm } from "react-hook-form";
function Advances(props) {
	// type Props = {
	//     some?: any,
	//     style?: string,
	// };


	const handleCancel = () => {
		setIsModalVisible(false);
	};
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
			title: 'Money',
			dataIndex: 'money',
			key: 'money',		
		},
		{
			title: 'Option',
			key: 'option',
			render: (piece) => (
				<Space size='middle'>
					<div
						onClick={() => deleteEmployee(`/${piece.id}`)}
						// className='head_container__button head_container__button--add'
						// onClick={showModal}
					>
						<FaTrashAlt />
					</div>
				</Space>
			),
		},
	];

	let {id} = useParams();
	const deleteEmployee=(id)=>{
		if(window.confirm('Are you sure')){
			fetch('http://localhost:8080/api/v4/advances'+id,{
		
		method:'DELETE',
		header:{'Accept':'application/json',
		'Conten-type':'application/json'}
		
		
			})
		}
		  }

	const [advances, setadvances] = useState([]);
	
	const getAdvance = async () => {
		await AdvancesService.getAdvancesById(id).then(res => {     
			setadvances(res.data)
		}); 
	}
	useEffect(() => {
		
		
		getAdvance();
	}, [])

	const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
	
	const onSubmit = async data => {
		
	await AdvancesService.createAdvances({...data,employeeId:props.employees.no}).then(res => getAdvance())
	   
	}
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => {
		setIsModalVisible(true);
	};
	
	const handleOk = () => {
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
	return (
		<>
			<div className='head_container'>
		<div className='head_container__title'><b>ADVANCES</b></div>
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
				title='Add New Advances'
				visible={isModalVisible}
				footer={null}
				onCancel={handleCancel}
		
			>	



			{ <form   onSubmit={handleSubmit(onSubmit)}
			
				>
 	  <label>Money:
      <input type="number"  {...register("money", {required: true})} />
      </label>
	  <label>Start day:
	  <input type="date"  {...register("start", {})} />
</label>
<input type="submit" onClick={someFunc}/>
    </form> }
			</Modal>

			<div className='advances-container'>
				<Table columns={columns} dataSource={advances} />
			</div>
		</>
	);
}

export default Advances;
