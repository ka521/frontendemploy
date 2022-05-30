import './Statistics.scss';
import 'antd/dist/antd.css';
import EmployeeService from '../../service/EmployeeService';
import { Row, Col } from 'antd';
import React, { useState, useEffect, useMemo, useRef  } from 'react'
import { useParams } from 'react-router-dom';
function Statistics(props) {
	


	let {id} = useParams();
	console.log('alo',id)
	const [statistics, setstatistics] = useState([]);
	console.log('tao',statistics)
	
	useEffect(() => {
		
		
		EmployeeService.getStatisticById(id).then(res => {     
			setstatistics(res.data)
		}); 
	}, [])
	







	return (
		<>
			<h1>STATISTICS</h1>
			<div className='info-container'>
				<Row gutter={24}>
					<Col className='gutter-row' span={24}>
						<div className='info-box'>ALL MONEY</div>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col className='gutter-row' span={24}>
						<div className='info-box'>Number of Working Day:{statistics.numberOfWorkingDay}</div>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col className='gutter-row' span={24}>
						<div className='info-box'>Total get:{statistics.totalGet}</div>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col className='gutter-row' span={24}>
						<div className='info-box'>Total advances:{statistics.totalAdvances}</div>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col className='gutter-row' span={24}>
						<div className='info-box'>Sumary:{statistics.summary}</div>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Statistics;
