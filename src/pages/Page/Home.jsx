import { useEffect, useState } from 'react';

import Table from '../../components/Table/Table';
import axios from 'axios';

import { Input, Spin } from 'antd';
import HeadContainer from '../../components/HeadContainer/HeadContainer';

const { Search } = Input;

export default function Home(props) {
	const { render, renderPage } = props;
	const onSearch = (e) => {
		setInputSearch('');
		if (e) {
			console.log(e);
			const value = e.toLowerCase();
			const filterData = employeeList.filter((employee) => {
				return employee.fullName.toLowerCase().includes(value);
			});
			setEmployeeList(filterData);
		} else setEmployeeList(data);
		e = '';
	};
	const [employeeList, setEmployeeList] = useState([]);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [inputSearch, setInputSearch] = useState('');
	const [selectedDelete, setSelectedDelete] = useState([]);

	console.log('selectedDelete', selectedDelete);

	function getSelected(array) {
		setSelectedDelete(array);
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(
					'http://localhost:8080/api/employees/list'
				);
				console.log(response);
				setEmployeeList(response.data);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, [render]);

	

	const totalEmployees = employeeList.length;
	return (
		<div>
			<HeadContainer
				selectedDelete={selectedDelete}
				renderPage={renderPage}
			></HeadContainer>
			{isLoading ? (
				<div style={{ marginLeft: '28vmax' }}>
					<Spin tip='Loading...' />
				</div>
			) : (
				<div>
					<div className='search-block'>
						<div className='search-block__total-list'>
							Total {totalEmployees} employees
						</div>
						<div className='search-block__search-input'>
							<Input
								placeholder='input search text'
								
								style={{ width: 200 }}
								onChange={(e) => {
									
									onSearch(e.target.value);
								}}
							
							/>
						</div>
					</div>
					<div className='container'>
						<div className='container__search-result'>Search result</div>
						<div className='container-table'></div>
					</div>
					{employeeList && (
						<Table
							getSelected={getSelected}
							renderPage={renderPage}
							employeeList={employeeList}
						/>
					)}
				</div>
			)}
		</div>
	);
}
