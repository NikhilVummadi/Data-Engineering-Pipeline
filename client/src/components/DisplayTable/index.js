import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactDataGrid from 'react-data-grid';

// class DisplayTable extends Component {	//
const DisplayTable = ({ columns, rows, datachecks }) => (
	<div>
		<ButtonGroup>
      <Button variant="secondary" onClick={() => datachecks("stats")}>Statistics</Button>
			<Button variant="dark" onClick={() => datachecks("types")}>Data Types</Button>
			<Button variant="secondary" onClick={() => datachecks("missing")}>Empty Cells</Button>
		</ButtonGroup>
		<hr />
		<ReactDataGrid
			columns={columns}
			rowGetter={i => rows[i]}
			rowsCount={rows.length}
			minHeight={700}
		/>
	</div>
)

export default DisplayTable;