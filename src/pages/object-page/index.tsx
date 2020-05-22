// React Imports
import React from 'react';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

// Utility
import {FiSearch} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';

// Styling
import './object-page.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';

// Components
import Header from '../../components-business/header';


const ObjectPage = () => {
  return (
    <div className="page-wrapper2 bg-blue object-page">
        <Row className={'page-container2 bg-white'}>
          <Container>
            <Header />

            {/* TITLE BAR START */}
            <div className={'title-container'}>
              <div className={'center-block'}>
                <img src={Icons.deviceList}/>
                <div className={'title-text'}>{'Object List'}</div>
              </div>
              <div className={'right-block'}>
                <div className={'custom-btn'}>
                  <img src={Icons.deviceAddIcon}/>
                  <div>{'Add Device'}</div>
                </div>
              </div>
            </div>
            {/* TITLE BAR END */}
            
            {/* OPTIONS BAR START */}
            <div className={'options-container'}>
              <div className={'center-block'}>
                <div className={'search-input-container'} >
                  <input className={'search-input'} placeholder={'Search Object'} />
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
            <Table responsive>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Date</th>
                  <th>Object Name</th>
                  <th>Object ID</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table>
            {/* LIST BLOCK END */}
            
          </Container>
        </Row>
    </div> 
  );
};

export default ObjectPage;
