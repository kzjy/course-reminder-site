import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


export class Alerts extends Component {

    static propTypes = {
        error : PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prev) {
        const { error, alert, message } = this.props;
        if (error !== prev.error) {
            if (error.message.name) {
                alert.error(`Name: ${error.message.name.join()}`)
            };
            if (error.message.total) {
                alert.error(`Total: ${error.message.total.join()}`)
            };
            if (error.message.non_field_errors) {
                alert.error(`${error.message.non_field_errors.join()}`)
            }
            if (error.message.username) {
                alert.show('The email is already in use')
            }if (error.message.due_date) {
                alert.show(`DueDate: ${error.message.due_date.join()}`)
            }
        }

        if (message !== prev.message) {
            if (message.reminderDeleted) {
                alert.success("Sucessfully deleted")
            }
            if (message.reminderAdded) {
                alert.success('Successfully added ')
            }
            if (message.passwordNotMatch) {
                alert.show(message.passwordNotMatch)
            }
            if (message.EmptyDate) {
                alert.error(message.EmptyDate)
            }
            if (message.EmptyName) {
                alert.error(message.EmptyName)
            }
            
        }

    }

    render() {
        return (
            <Fragment/>
        )
    }
}

const mapStateToProps = state => ({
    error: state.errorsReducer,
    message: state.messagesReducer
})

export default connect(mapStateToProps)(withAlert()(Alerts));
