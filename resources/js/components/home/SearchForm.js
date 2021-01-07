import React, {Component} from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';



export default class SearchForm extends Component {

	render(){
		return(
			<div className="mb-5 mt-5 justify-content-center align-items-center">
		        <Form>
		          <FormGroup>
		            <Input
		              type="text"
		              name="search"
		              placeholder="Search Friends"
		              defaultValue={this.props.search}
		              onChange={this.props.changeHandler}
		            />
		          </FormGroup>
				  <p className="text-danger">{this.props.errMsg}</p>		          
		          <Button
		            className="text-center mb-0"
		            color="success"
		             onClick={this.props.searchHandler}
		          >
		            Search
		          
		          </Button>
		        </Form>
		      </div>
		);
	}
}