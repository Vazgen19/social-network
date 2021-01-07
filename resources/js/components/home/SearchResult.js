import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class SearchResult extends Component {
    
    componentDidMount(){
        console.log(this.props);
    }

    render(){
        return (
			<div>
				<h1>{this.props.message}</h1>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<td className="col">Full Name</td>
							<td className="col">Email</td>
							<td className="col">Actions</td>
						</tr>
					</thead>
					<tbody>
						{ this.props.users.map((item, index) => (							
					        <tr key={index}>
					        	<td className="">{item.name} {item.surname}</td>
					        	<td className="">{item.email}</td>
					        	<td className="">
					        		<Button className="btn-success" onClick = {() => this.props.sendFriendResquestHandler(item.id)}>Send Friend Request</Button>
					        	</td>
					        </tr>
					    ))}
					</tbody>
				</table>
			</div>

		);
    }
}