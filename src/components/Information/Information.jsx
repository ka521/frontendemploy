import './Information.scss';
import 'antd/dist/antd.css';
import moment from 'moment';
import {  Row, Col } from 'antd';
import { useEffect, useState } from 'react';

function Information(props) {
	// type Props = {
	//     some?: any,
	//     style?: string,
	// };
	console.log(props.information);
	const {
		startDay,
		teamInfo,
		address,
		moneyPerHour,
		// fullName,
		// age,
		// gender,
		// phoneNumber,
		// totalHours,
	} = props.information;

	return (
		<>
			<h1>INFORMATION</h1>
			<div className='info-container'>
				<Row gutter={16}>
					<Col className='gutter-row' span={12}>
						<div className='info-box'>
							Start day : {moment(startDay).utc().format('DD/MM/YYYY')}
						</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className='info-box'>Team : {teamInfo.name}</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className='info-box'>Address : {address}</div>
					</Col>
					<Col className='gutter-row' span={12}>
						<div className='info-box'>Salary Per hour : {moneyPerHour}$</div>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Information;
