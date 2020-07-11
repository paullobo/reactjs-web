// React Imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../slice';
import { logoutUser } from '../../pages/app/app.slice';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Utility
import Button from 'react-bootstrap/Button';

// Styling
import './dashboard.scss';


const Dashboard = (props:any) => {
  const dispatch = useDispatch();

  const { userData } = useSelector(
    (state: RootState) => state.appSlice
  )


  const handleLogout = () =>{
    dispatch(logoutUser())
  }


  return (
    <div className="page-wrapper2 bg-blue dashboard-page">
      <Row className={'page-container2 bg-white'}>
        <Container>
          <div>
            <h1>
              Welcome {userData && userData.firstName ? userData.firstName : ''} your inside the App !
            </h1>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Container>
      </Row>
  </div> 
  )
};

export default Dashboard;
