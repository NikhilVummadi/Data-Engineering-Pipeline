import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

class DisplayTable extends Component {
	render()  {
		
		return (
			<div>
				<Table striped bordered hover responsive size="sm" variant="dark">
					<thead>
						<th>A</th>
						<th>B</th>
						<th>C</th>
					</thead>
					<tbody>
						<tr>
							<td>x</td>
							<td>y</td>
							<td>z</td>
						</tr>
						<tr>
							<td>x</td>
							<td>y</td>
							<td>z</td>
						</tr>
						<tr>
							<td>x</td>
							<td>y</td>
							<td>z</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default DisplayTable;