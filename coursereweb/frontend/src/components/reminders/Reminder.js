import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getReminders, deleteReminders } from "../../actions/reminderAction";

export class Reminder extends Component {
  static propTypes = {
    reminders: PropTypes.array.isRequired,
    getReminders: PropTypes.func.isRequired,
    deleteReminders: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getReminders();
  }

  simlifyTime(dateTime) {

  }

  simplifyStatus(status) {
    return 'Complete' ? status : 'Not complete';
  }

  render() {
    return (
      <Fragment>
        <h3>Dem reminders </h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Due</th>
              <th scope="col">Status</th>
              <th scope="col">Received</th>
              <th scope="col">Total</th>
              <th scope="col">Weight</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.reminders.map(reminder => (
                <tr className="table-default" key={reminder.id}>
                    <td>{reminder.name}}</td>
                    <td>{reminder.reminder_type}</td>
                    <td>{reminder.due_date}</td>
                    <td>{reminder.status}</td>
                    <td>{reminder.received}</td>
                    <td>{reminder.total}</td>
                    <td>{reminder.weight}</td>
                    <td>
                        <button onClick={this.props.deleteReminders.bind(this, reminder.id)} type="button" className="btn btn-secondary">Delete</button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary btn-lg btn-block" style={{margin:'5%', width:'90%'}}>Add New + </button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  reminders: state.reminderReducer.reminders
});

export default connect(mapStateToProps, { getReminders, deleteReminders })(Reminder);
