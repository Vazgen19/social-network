import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class SearchResult extends Component {
    
    componentWillMount(){
        console.log(this.props);
    }

    checkButton  = (id) => {     
       return  this.props.requestIds.includes(id);
    }

    render(){        
        return (
			<div>				
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
					        		<Button disabled = {this.checkButton(item.id)} className="btn-success" onClick = {() => this.props.sendFriendRequestHandler(item.id)}>
                                        { this.checkButton(item.id) ? 'Request Sended': 'Send Friend Request' }
                                    </Button>
					        	</td>
					        </tr>
					    ))}
					</tbody>
				</table>
			</div>
		);
    }
}