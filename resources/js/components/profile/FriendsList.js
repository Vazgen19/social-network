import React, {Component} from 'react';
import { Button } from 'reactstrap';


export default class FriendsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			usersList: [],
			friendStatuses: ['approved', 'pending', 'rejected']
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
		const headers = { headers: {"Authorization" : `Bearer ${token}`}, data:  {id: id} };

		axios
		  .delete("http://social.loc/api/friend",  headers)
		  .then((response) => {
		  	if (response.data.status === 200) {
		  		this.setState({usersList: response.data.friends});
		  	}
		  })
	}

	onChangeStatusHandler(id, status) {
		const token  = localStorage.getItem('token');
		const headers = { headers: {"Authorization" : `Bearer ${token}`} };
		axios
		  .put("http://social.loc/api/friend", {id: id, status: status}, headers)
		  .then((response) => {
		  	if (response.data.status === 200) {
		  		this.setState({usersList: response.data.friends});
		  	}
		  })
	}

	render(){
		const userId = JSON.parse(localStorage.getItem('userData')).id;
		return (
			<div>
				<h1> Friends List</h1>
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
					        	<td className="col">
					        		 {item.pivot.status === 1 && userId === item.pivot.receiver_id && (
									    <React.Fragment>
										      <Button className="btn-success" onClick = {() => this.onChangeStatusHandler(item.id,this.state.friendStatuses[0])}>Accept</Button>
										      <Button className="btn-warning" onClick = {() => this.onChangeStatusHandler(item.id,this.state.friendStatuses[2])}>Reject</Button>
								      	</React.Fragment>
								      )
								      }
								      {item.pivot.status === 2 && (
									    <React.Fragment>
										      <Button className="btn-success" onClick = {() => this.onChangeStatusHandler(item.id,this.state.friendStatuses[0])}>Accept</Button>
										     
								      	</React.Fragment>
								      )
								      }
					        		<Button className="btn-danger" onClick = {() => this.unfriendHandler(item.id)}>Unfriend</Button>
					        	</td>
					        </tr>
					    ))}
					</tbody>
				</table>
			</div>

		);
	}
}