// import React from 'react';
// import updateMovie from '../store/actions/updateMovies';
// import fetchUsers from '../store/actions/fetchUser';
// import {connect} from 'react-redux';

// function Test(props) {
//   return (
//       <div>

//       <p> <h1>{props.movies.name}</h1></p>
//       <br/>
//       <button onClick={props.updateMovie}>Update Movie </button>
//       <br/>
//       {props.users.length === 0 ? <p>There is no User</p>
//       :props.users.map(user => <p>{user.email} - {user.first_name}</p>) 
//       }

//       <br/>
//       <button onClick={props.fetchUsers}>Fetch Users  </button>
//       </div>
//   )
// }
// const MapStateToprops = (state) =>{ 
//   return {
//     movies : state.movies,
//     users: state.users
//   }

// }

// const MapDispatchToprops = (dispacth) => {
//   return {
//     updateMovie : () => dispacth(updateMovie),
//     fetchUsers : () => dispacth(fetchUsers)
//   }

// }

// export default connect(MapStateToprops, MapDispatchToprops)(Test)