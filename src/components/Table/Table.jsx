import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { FaTrashAlt, FaInfo } from 'react-icons/fa';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
const { confirm } = Modal;

// getCheckboxProps: (record) => ({
// 	disabled: record.name === 'Disabled User',
// 	// Column configuration not to be checked
// 	name: record.name,
// }),

const TableUI = (props) => {
	const { renderPage, getSelected } = props;

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows
			);
			let coppyArray = [];
			coppyArray = selectedRows.map((selected) => {
				return selected.id;
			});
			console.log('coppyArray', coppyArray);
			getSelected(coppyArray);
		},
	};
	const columns = [
		{
			title: 'No',
			dataIndex: 'key',
		},
		{
			title: 'FullName',
			dataIndex: 'fullname',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
		},
		{
			title: 'Team',
			dataIndex: 'team',
		},
		{
			title: 'Option',
			key: 'id',
			// dataIndex: 'option',
			render: (data) => (
				<Space size='middle'>
					<Link to={`/${data.id}`}>
						<div>
							<FaInfo style={{ color: 'blue', cursor: 'pointer' }} />
						</div>
					</Link>
					<div onClick={() => handleDeleteAnEmployee(data.id)}>
						<FaTrashAlt style={{ cursor: 'pointer' }} />
					</div>
				</Space>
			),
		},
	];

	const handleDeleteAnEmployee = (data) => {
		console.log('log', data);
		function showPromiseConfirm(data) {
			console.log('data in modal', data);
			confirm({
				title: 'Are you sure to delete employee ?',
				icon: <ExclamationCircleOutlined />,
				// content:
				// 	'When clicked the OK button, this dialog will be closed after 1 second',
				async onOk() {
					try {
						const response = await axios.delete(
							// `http://localhost:8080/api/employees/${data}`
							`http://localhost:8080/api/employees/delete/${data}`
						);
						console.log(response);
						renderPage();
						toast.success(response.data.message);
					} catch (error) {
						toast.error(error);
					}
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 400);
					}).catch(() => console.log('Oops errors!'));
				},
				onCancel() {},
			});
		}
		showPromiseConfirm(data);

	};
	console.log('rerender');
	const employeeRender = [];
	console.log(employeeRender);
	const { employeeList } = props;
	employeeList.forEach(async (employee, index) => {
		await employeeRender.push({
			id: employee.no,
			key: index + 1,
			fullname: employee.fullName,
			team: employee.teamName,
			phone: employee.phoneNumber,
		});
	});

	return (
		<div>
			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={employeeRender}
				pagination={{
					defaultPageSize: 5,
				}}
			/>
		</div>
	);
};

export default TableUI;
