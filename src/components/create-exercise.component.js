import React , { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
      axios.get('http://localhost:3000/users/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username : response.data[0].username
                })
            }
        })
    }

        onChangeUserName(e) {
            this.setState({
                username: e.target.value
            });
        }

        onChangeDescription(e) {
            this.setState({
                description: e.target.value
            });
        }

        onChangeDuration(e) {
            this.setState({
                duration: e.target.value
            });
        }

        onChangeDate(date) {
            this.setState({
                date: date
            });
        }

        onSubmit(e) {
            e.preventDefault();

            const exercise = {
                username: this.state.username,
                description: this.state.description,
                duration: this.state.duration,
                date: this.state.date
            }

            console.log(exercise);

            axios.post('http://localhost:3000/exercises/add' , exercise)
            .then(res => console.log(res.data));

            window.location = '/';
        }

    render() {
        return (
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group my-2">
                    <label>Username: </label>
                    {/* ref="userInput" */}
                    <select required className="form-control" value={this.state.username} onChange={this.onChangeUserName}>{
                        this.state.users.map(user => {
                            return <option key={user} value={user}>{user}</option>;
                        })
                    }
                    </select>
                </div>
                <div className="form-group my-2">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                </div>
                <div className="form-group my-2">
                    <label>Duration (in minutes): </label>
                    <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
                </div>
                <div className="form-group my-2">
                    <label>Date: </label>
                    <div>
                        <DatePicker 
                        selected={this.state.date} onChange={this.onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary my-3"/>
                </div>
            </form>
            </div>
        );
    }
}