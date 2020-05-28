// React Imports
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../slice';
import { logoutUser } from '../../pages/app/app.slice';

// Componenets
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {IoIosArrowDropdown} from 'react-icons/io';

// Utility
import {checkScreenWidthMobile} from '../../utils/common';
import {clearLocalUser} from '../../utils/auth';

// Styling
import './header.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';


const Header = (props:any) => {

  const dispatch = useDispatch();
  const [menuVisible,toggleMenu] = useState(false);

  const { userData:orgData } = useSelector(
    (state: RootState) => state.appSlice
  )
  
  const handleMenuItemClick = (event:any) =>{
    const id = event.target.id;
    switch(id){
      case 'item1':
        break;
      case 'item2':
        break;
      case 'item3':
        handleLogout();
        break;
    }
  }

  const handleLogout = () =>{
    dispatch(logoutUser())
  }

  return (
    <div className={'header-container'}>
        <img src={Images.earthIdLogoTxt} className={'header-logo'}/>
        <img src={Images.earthIdLogoEmblem} className={'header-logo-mb'}/>
        {props && props.optionVisible ? <div className={`right-block ${menuVisible?'active':''}`} onClick={()=>toggleMenu(!menuVisible)}>
            <img src={Images.companyProfile} className={'profile-image'}/>
            <div className={'profile-name'}>
                {(orgData as any).name}
            </div>
            <IoIosArrowDropdown size={20}/>
            {menuVisible ? <div className={'drop-down'}>
              <ol className="option-menu">
                  <li className="option-item" id={'item1'} onClick={handleMenuItemClick}>
                     My Profile
                  </li>
                  <li className="option-item" id={'item2'} onClick={handleMenuItemClick}>
                      Change Password
                  </li>
                  <li className="option-item" id={'item3'} onClick={handleMenuItemClick}>
                      Logout
                  </li>
              </ol>
            </div> : null}
        </div> : null}
        
    </div>
  );
};

export default Header;
