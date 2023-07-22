import React, { Component } from 'react';
import { useParams } from 'react-router-dom'; // For accessing URL parameters
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EditExercises() {
  const { id } = useParams(); // For accessing URL parameter id

  const [state, setState] = React.useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  });

  React.useEffect(() => {
    axios.get(`http://localhost:3000/exercises/${id}`)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        }));
      })
      .catch(err => console.log(err));
    
    axios.get('http://localhost:3000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setState(prevState => ({
            ...prevState,
            users: response.data.map(user => user.username),
          }));
        }
      });
  }, [id]); // Fetch data on component mount and whenever id changes

  const onChangeUserName = (e) => {
    setState(prevState => ({
      ...prevState,
      username: e.target.value,
    }));
  };

  const onChangeDescription = (e) => {
    setState(prevState => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const onChangeDuration = (e) => {
    setState(prevState => ({
      ...prevState,
      duration: e.target.value,
    }));
  };

  const onChangeDate = (date) => {
    setState(prevState => ({
      ...prevState,
      date: date,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };

    console.log(exercise);

    axios.post(`http://localhost:3000/exercises/update/${id}`, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select required className="form-control" value={state.username} onChange={onChangeUserName}>
            {state.users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text" required className="form-control" value={state.description} onChange={onChangeDescription} />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text" required className="form-control" value={state.duration} onChange={onChangeDuration} />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={state.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
