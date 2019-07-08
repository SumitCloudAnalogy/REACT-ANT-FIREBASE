import { Form, Icon, Input, Button } from 'antd';
import React from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary'
import AppHeader from '../UI/Header/Header'
import UserRecords from "./UserRecords/UserRecords";
import axios from  '../../axios-orders';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {

    state = {
        data: null,
        loading: false
    };

    componentWillMount() {
        this.setState({loading : true});
        axios.get('/CRUD.json')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({data: fetchedOrders});
                console.log(fetchedOrders);
                this.setState({loading : false});
            })
            .catch(error => {
                console.log(error);
            })
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        console.log('componentDidMount');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('/CRUD.json', values)
                    .then(response => {

                    })
                    .catch()
            }
        });

        console.log('handleSubmit');
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const ageError = isFieldTouched('age') && getFieldError('age');
        let _records = null;
        if (!this.state.loading) {
            _records = this.state.data.map(records => (
                <UserRecords
                    key={records.id}
                    username={records.username}
                    age={records.age}
                > </UserRecords>
            ) )
        }
        return (
            <Aux>
                <AppHeader/>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: 'Please input your age!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="number"
                                placeholder="age"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Add Record
                        </Button>
                    </Form.Item>
                </Form>
                {_records}
            </Aux>

        );
    }
}

export default  Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

