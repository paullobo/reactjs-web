// React Imports
import React, {useState} from 'react';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Utility
import {FiSearch} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {stringReplaceAt} from '../../utils/common';

// Styling
import './activation-page.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';

// Components
import Header from '../../components-business/header';


const ActivationPage = () => {

  const [code,updateCode] = useState('');

  const handleKeyUp = (event:any) =>{
    const id = event.target.id;
    const value = event.target.value ? event.target.value : ' ';
    console.log('UPDATED VALUE ID',value,id)

    let updatedcode = code ? code : '    '; 
    switch(id){
      case 'c1':
        updatedcode = stringReplaceAt(updatedcode,0,value);
        break;
      case 'c2':
        updatedcode = stringReplaceAt(updatedcode,1,value);
        break;
      case 'c3':
        updatedcode = stringReplaceAt(updatedcode,2,value);
        break;
      case 'c4':
        updatedcode = stringReplaceAt(updatedcode,3,value);
        break;
    }
    console.log('UPDATED CODE',code,updatedcode,value,id)
    updateCode(updatedcode);
  }

  return (
    <div className="page-wrapper2 bg-blue object-page">
        <Row className={'page-container2 bg-white'}>
          <Container>
            <Header/>

            {/* VERIFY CODE BLOCK START */}
            <div className={'verify-container'}>
              <div className={'verify-block'}>
                <div className={'title-txt'}>
                  Enter the 4-digit Number to activate the device
                </div>
                <div className={'verify-code'}>
                  <input id={'c1'} className={'code-input'}  maxLength={1} onKeyUp={handleKeyUp}/>
                  <input id={'c2'} className={'code-input'}  maxLength={1} onKeyUp={handleKeyUp}/>
                  <input id={'c3'} className={'code-input'}  maxLength={1} onKeyUp={handleKeyUp}/>
                  <input id={'c4'} className={'code-input'}  maxLength={1} onKeyUp={handleKeyUp}/>
                </div>
                <Button className={'verify-btn'}>Submit</Button>
              </div>
            </div>
            {/* VERIFY CODE BLOCK END */}
            
          </Container>
        </Row>
    </div> 
  );
};

export default ActivationPage;
