import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios';


class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}


    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(
            `http://jsonplaceholder.typicode.com/users/${id}`
        )
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
    }
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;
        //Check fields
        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Email is required' } });
            return;
        }
        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is required' } });
            return;
        }
        const updContact = {
            name,
            email,
            phone,
        }
        const { id } = this.props.match.params;
        const res = await axios.put(`http://jsonplaceholder.typicode.com/users/${id}`, updContact);
        dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

        //Clear State
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });
        this.props.history.push('/');
    };
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {

        const { name, email, phone, errors } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3" >
                            <div className="card-header">Edit Contact
                     <div className="card-body">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)} >

                                        <TextInputGroup
                                            label="Name"
                                            name="name"
                                            value={name}
                                            placeholer="Enter name"
                                            onChange={this.onChange}
                                            error={errors.name}
                                        />
                                        <TextInputGroup
                                            label="email"
                                            name="email"
                                            placeholer="Enter email"
                                            value={email}
                                            onChange={this.onChange}
                                            error={errors.email}
                                        /> <TextInputGroup
                                            label="phone"
                                            name="phone"
                                            value={phone}
                                            placeholer="Enter phone"
                                            onChange={this.onChange}
                                            error={errors.phone}
                                        />
                                        <input
                                            type="submit"
                                            value="Update Contact"
                                            className="btn btn-light btn-block" />
                                    </form>
                                </div>
                            </div>
                        </div>

                    )
                }}
            </Consumer>
        )

    }
}
export default EditContact;
