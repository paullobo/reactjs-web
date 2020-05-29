// React Imports
import React, { useEffect,useState } from 'react';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Modal from 'react-bootstrap/Modal';
import Modal from '@material-ui/core/Modal';



// Utility
import {FiSearch} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {MdModeEdit} from 'react-icons/md';
import {getErrorString} from '../../utils/common';
import notifier from '../../utils/notifier';
import {
  REQ_GET_EMPLOYEE,
  REQ_ADD_EMPLOYEE,
  REQ_UPDATE_EMPLOYEE
} from '../../services/api';
import Moment from 'react-moment';
import 'moment-timezone';

// Styling
import './employee-page.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';

// Components
import Header from '../../components-business/header';


const EmployeePage = () => {

  useEffect(()=>{
    handleGetEmployees();
  },[])

  const [employees,updateEmployees] = useState([]);
  const [addUpdateEmployeeVisible,updateAddEditEmployeeView] = useState(false);
  const [selectedEmployee,updateSelectedEmployee] = useState({});
  const [operationType,updateOperationType] = useState('add');

  const [empName,updateEmployeeName]=useState('');
  const [empEarthId,updateEmployeeEarthId]=useState('');

  const handleGetEmployees = async() =>{
    try{
      const requestParams ={
        // Nothing for now
      }
      const response = await REQ_GET_EMPLOYEE(requestParams);
      const employeeList = response.data.result;
      updateEmployees(employeeList);
    }catch(e){
      const errorString = getErrorString(e);
      console.log('ERROR in handleGetEmployees:::',errorString,e);
      notifier.error('Error',errorString);
    }
  }

  const handleAddEmployee = (selectedEmployee:any) =>{
    updateSelectedEmployee(selectedEmployee);
    updateOperationType('add');
    updateAddEditEmployeeView(true);
  }

  const handleInputChange = (e:any) =>{
    const id = e.target.name;
    const value = e.target.value;
    switch(id){
      case 'name':
        updateEmployeeName(value);
        break;
      case 'earthId':
        updateEmployeeEarthId(value);
        break;
      default:
        console.log('Something is fishy!')
    }
  }

  const handleOperation =()=>{

  }

  const AddUpdateModal = () =>{
    let title = `${operationType==='add' ? 'Add ':'Update'} Employee`;
    return null
      // return <Modal
      //   size="sm"
      //   show={addUpdateEmployeeVisible}
      //   onHide={() => updateAddEditEmployeeView(false)}
      //   aria-labelledby="example-modal-sizes-title-sm"
      //   centered
      //   className={'modal-view scrolling'}
      // >
      //   <Modal.Header closeButton>
      //     <div className={'modal-title'}>
      //       {title}
      //     </div>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <div className={'field-container'} >
      //       <input value={empName} onChange={handleInputChange}  name="name" />
      //         <TextField label="Name" variant="outlined" value={empName} name="name" onChange={handleInputChange}/>
      //     </div>
      //     <div className={'field-container'}>
      //         <TextField label="Earth ID" variant="outlined" value={empEarthId} name="earthId" onChange={handleInputChange}/>
      //     </div>
      //     <div className={'modal-footer'}>
      //         <Button className={'modal-btn cancel'} onClick={()=>updateAddEditEmployeeView(false)} >Cancel</Button>
      //         <Button className={'modal-btn addupdate'} onClick={handleOperation} disabled={!empEarthId || !empName}>{title}</Button>
      //     </div>
      //   </Modal.Body>
      // </Modal>
  }

  return (
    <div className="page-wrapper2 bg-blue employee-page">
        <Row className={'page-container2 bg-white'}>
          <Container>
            <Header optionVisible/>

            {/* TITLE BAR START */}
            <div className={'title-container'}>
              <div className={'center-block'}>
                <img src={Icons.employeeList}/>
                <div className={'title-text'}>{'Employee List'}</div>
              </div>
              <div className={'right-block'}>
                <div className={'custom-btn'}>
                  <img src={Icons.employeeAddIcon}/>
                  <div>{'Add Employee'}</div>
                </div>
              </div>
            </div>
            {/* TITLE BAR END */}
            
            {/* OPTIONS BAR START */}
            <div className={'options-container'}>
              <div className={'center-block'}>
                <div className={'search-input-container'} >
                  <input className={'search-input'} placeholder={'Search Employee'} />
                  <FiSearch size={14}/>
                </div>
              </div>
              <div className={'right-block'}>
                  <BsTrash size={14}/>
                  <div className={'block-text'}>{'Delete All'}</div>
              </div>
            </div>
            {/* OPTIONS BAR END */}

            {/* LIST BLOCK START */}
            {employees && employees.length>0 ? <Table responsive className={'data-table'}>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>Earth ID</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e:any)=>
                <tr>
                  <td>
                    <Checkbox
                       checked={true}
                       onChange={()=>{}}
                       name="checkedB"
                       color="primary"
                     />
                  </td>
                  <td> <Moment fromNow>{e.createdDate}</Moment></td>
                  <td>{e.name}</td>
                  <td>{e.earthId}</td>
                  <td className={'cta-td-icon edit'}><MdModeEdit onClick={()=>handleAddEmployee(e)}/></td>
                  <td className={'cta-td-icon delete'}><BsTrash/></td>
                </tr>)}
              </tbody>
            </Table> : <div className={'nodata-found'}>No Employees to show</div>}
            {/* LIST BLOCK END */}
            
          </Container>
        </Row>
        <AddUpdateModal/>
    </div> 
  );
};

export default EmployeePage;

