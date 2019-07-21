import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addReminders} from '../../actions/reminderAction'
import Popup from 'reactjs-popup'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../../../static/frontend/style.css'


export class AddReminder extends Component {
    state = {
        name: '',
        reminder_type: 'Assignment',
        due_date: new Date(),
        total: 100,
        received: 0,
        weight: 100,
        course: 1,
        popup: false,

    }

    static propTypes = {
        addReminders: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({popup: false})
        const {name, reminder_type, total, received, weight, course} = this.state;
        const due_date = this.state.due_date.toISOString()
        const newReminder = {name, reminder_type, total, received, weight, course, due_date};
        this.props.addReminders(newReminder);
        this.closePopup()
    }
    
    openPopup = e => {
        this.setState({popup: true})
    }

    closePopup = e => {
        this.setState({
            name: '',
            reminder_type: 'Assignment',
            due_date: '',
            total: 100,
            received: 0,
            weight: 100,
            course: 1,
            popup: false

        })
    }

    handleChange = date => {
        this.setState({
            due_date: date
        }, () => console.log(this.state.due_date));

      };

    render() {
        const {name, reminder_type, total, received, weight, course, due_date} = this.state
        return (
            <Popup
                trigger={<button type="button" className="btn btn-primary btn-lg btn-block" style={{margin:'5%', width:'90%'}}>Add New + </button>}
                modal
                closeOnDocumentClick
                onOpen={this.openPopup}
                open={this.state.popup}
            >
                {close => (
                <div style={{padding:'20px'}}>
                <form onSubmit={this.onSubmit}>
                <fieldset>
                    {/* name of reminder  */}
                    <legend>Add a new reminder</legend>
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="inputDefault">Reminde me to ...</label>
                        <input name="name" type="text" value={name} onChange={this.onChange}
                            className="form-control" placeholder="Default input" id="inputDefault"/>
                    </div>
                    
                    {/* course  */}
                    <div className="form-group">
                        <label htmlFor="exampleSelect1">Course</label>
                        <select name="course" className="form-control" id="exampleSelect1"  onChange={this.onChange}>
                            {
                                this.props.courses.map(course => {
                                    return <option value={course.id} key={course.id}>{course.name}</option>
                                })
                            }
                        </select>
                    </div>
                    

                    {/* Due date */}
                    <div className="form-group" className="due_date_container">
                        <label htmlFor="exampleSelect1">Due date</label>
                        <br/>
                        <DatePicker
                            type="text"
                            name="due_date"
                            className="form-control"
                            value={due_date}
                            selected={this.state.due_date}
                            onChange={this.handleChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            style={{width:'100%'}}
                        />
                        <br/>
                    </div>
                    
                    {/* course 
                    <div className="form-group">
                        <label htmlFor="exampleSelect1">Course</label>
                        <select name="course" className="form-control" id="exampleSelect1" value={course} onChange={this.onChange}>
                            <option>Assignment</option>
                            <option>Meet up</option>
                            <option>Test</option>
                            <option>Study</option>
                        </select>
                    </div> */}

                    {/* type of reminder  */}
                    <div className="form-group">
                        <label htmlFor="exampleSelect1">Reminder type</label>
                        <select name="reminder_type" className="form-control" id="exampleSelect1" value={reminder_type} onChange={this.onChange}>
                            <option>Assignment</option>
                            <option>Meet up</option>
                            <option>Test</option>
                            <option>Study</option>
                        </select>
                    </div>

                    {/* received  */}
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="inputDefault">Received*</label>
                        <input name="received" type="text" value={received} onChange={this.onChange}
                            className="form-control" placeholder="Default input" id="inputDefault"/>
                    </div>

                    {/* total  */}
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="inputDefault">Total</label>
                        <input name="total" type="text" value={total} onChange={this.onChange}
                            className="form-control" placeholder="Default input" id="inputDefault"/>
                    </div>

                    {/* weight */}
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="inputDefault">Weight</label>
                        <input name="weight" type="text" value={weight} onChange={this.onChange}
                            className="form-control" placeholder="Default input" id="inputDefault"/>
                    </div>

                    {/* <div className="form-group">
                        <label for="exampleTextarea">Example textarea</label>
                        <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
                    </div> */}
                    
                    <div style={{justifyContent:'center', display:'flex'}}>
                        <button type="submit" style={{width:'150px', margin:'0px 10px 0px 10px'}} className="btn btn-primary">Add</button>
                        <button type="reset" onClick={this.closePopup} style={{width:'150px', margin:'0px 10px 0px 10px'}} className="btn btn-secondary">Discard</button>
                    </div>
                </fieldset>
                </form>

                
            </div>
                )}
            </Popup>
        )
    }
}

const mapStateToProps = state => ({
    courses: state.reminderReducer.courses
});

export default connect(mapStateToProps, {addReminders})(AddReminder);
