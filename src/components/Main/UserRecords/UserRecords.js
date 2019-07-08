import React from 'react';
import { Card } from 'antd';
import classes from './UserRecords.css'

class UserRecords extends React.Component {
    render () {
        return (
            <div className='UserRecords'>
                <Card >
                    <h3>{this.props.username}</h3>
                    <p>{this.props.age}</p>
                </Card>
            </div>

        )
    }
}
export default UserRecords;
