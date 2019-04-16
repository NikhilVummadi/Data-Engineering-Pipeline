import React from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const header = ['First Column', 'Second Column', 'Third Column']
const data = [['Row 1 Column 1', 'Row 1 Column 2', 'Row 1 Column 3'],
				['Row 2 Column 1', 'Row 2 Column 2', 'Row 2 Column 3'],
				['Row 3 Column 1', 'Row 3 Column 2', 'Row 3 Column 3']
			]
const DisplayTable = () => (
	<div>
		<Table striped bordered hover responsive size="sm" variant="dark">
			<thead>
				<tr>
					{header.map((title, index) =>  
						<th key={index}>
							{title}
						</th>
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => 
					<tr key={index}>
						{row.map((cell,  index) => 
							<td key={index}>
								{cell}
							</td>	
						)}
					</tr>
				)}
			</tbody>
		</Table>
	</div>
)

export default DisplayTable;