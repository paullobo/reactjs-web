// React Imports
import React from 'react';

// Utility
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styling
import './manage.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';


const Manage = () => {
  return (
    <div className="page-wrapper manage-page">
        <Row className={'page-container'}>
          <Col className={'left-container'}>
            <div className={'text-block'}>
                <img src={Images.abstractCircular} className={'ele ele-1'}/>
                <img src={Images.abstractConcentric} className={'ele ele-2'}/>
                <img src={Images.abstractConcentric} className={'ele ele-3'}/>
                <img src={Images.abstractDots} className={'ele ele-4'}/>
                <img src={Images.abstractDots} className={'ele ele-5'}/>
                <img src={Images.abstractDots} className={'ele ele-6'}/>
                <div className={'text-block-head'}>One Earth.</div>
                <div className={'text-block-desc'}>One ID.</div>
            </div>
          </Col>
          <Col className={'right-container'}>
            <img src={Images.earthIdLogoTxt} className={'head-logo'}/>
            <div className={'btn-container'}>
              <div className={'custom-btn employee'}>
                <img src={Icons.employeeManage}/>
                <div className={'text-block'}>
                  <div className={'text-block-head'}>Employee Management</div>
                  <div className={'text-block-desc'}>Create, Edit &amp; Delete</div>
                </div>
              </div>
              <div className={'custom-btn device'}>
                <img src={Icons.deviceManage}/>
                <div className={'text-block'}>
                  <div className={'text-block-head'}>Device Management</div>
                  <div className={'text-block-desc'}>Create, Edit &amp; Delete</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default Manage;
