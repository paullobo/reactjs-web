// React Imports
import React from 'react';

// Componenets
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Utility
import {checkScreenWidthMobile} from '../../utils/common';

// Styling
import './header.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';


const Header = (props:any) => {
  
  return (
    <div className={'header-container'}>
        <img src={Images.earthIdLogoTxt} className={'header-logo'}/>
        <img src={Images.earthIdLogoEmblem} className={'header-logo-mb'}/>
        {props && props.optionVisible ? <div className={'right-block'}>
            <img src={Images.companyProfile} className={'profile-image'}/>
            <div className={'profile-name'}>
                Rejolut Technologies Pvt Ltd
            </div>
        </div> : null}
        
    </div>
  );
};

export default Header;
