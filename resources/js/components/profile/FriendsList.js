import React, {Component} from 'react';
import { Button } from 'reactstrap';


export default class FriendsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			usersList: [],
			friendStatuses: ['Approved', 'Pending', 'Rejected']
		}
	}



	componentWillMount() {
		const token  = localStorage.getItem('token');
		const headers = { headers: {"Authorization" : `Bearer ${token}`} };
		axios
		  .get("http://social.loc/api/friends", headers)
		  .then((response) => {
		  	if (response.data.status === 200) {
		  		this.setState({usersList: response.data.friends});
		  	}
		  })
	}

	unfriendHandler (id) {
		const token  = localStorage.getItem('token');
		const headers = { headers: {"Authorization" : `Bearer ${token}`} };
		axios
		  .post("http://social.loc/api/unfriend", {id: id}, headers)
		  .then((response) => {
		  	if (response.data.status === 200) {
		  		this.setState({usersList: response.data.friends});
		  	}
		  })
	}

	render(){
		return (
			<div>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<td className="col-4">Full Name</td>
							<td className="col-4">Email</td>
							<td className="col-4">Status</td>
							<td className="col-4">Actions</td>
						</tr>
					</thead>
					<tbody>
						{ this.state.usersList.map((item, index) => (
					        <tr key={index}>
					        	<td className="">{item.name} {item.surname}</td>
					        	<td className="col">{item.email}</td>
					        	<td className="col">{this.state.friendStatuses[item.pivot.status]}</td>
					        	<td className="col"><Button className="btn-danger" onClick = {() => this.unfriendHandler(item.id)}>Unfriend</Button></td>
					        </tr>
					    ))}
					</tbody>
				</table>
			</div>

		);
	}
}