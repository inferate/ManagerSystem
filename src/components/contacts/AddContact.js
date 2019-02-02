import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios';


class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {

        }
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
        const newContact = {
            name,
            email,
            phone,
        };
        const res = await axios
            .post('http://jsonplaceholder.typicode.com/users', newContact);
        dispatch({ type: 'ADD_CONTACT', payload: res.data });


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
                            <div className="card-header">AddContact
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
                                            value="Add Contact"
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
export default AddContact;
