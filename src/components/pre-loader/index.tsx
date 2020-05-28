import React from 'react';

// Utility and Constants
import Lottie from 'react-lottie';

// Assets
import {Images} from '../../assets/images';
import {Animations} from '../../assets/animations';

// Styles
import './pre-loader.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Animations.circularLoading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid",
  },
  className:'circular-loader'
};

const PreLoader = () => {
    return (
      <div className={'loader-container'}>
        
         <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isClickToPauseDisabled={false}
          />
            {/* <img src={Images.earthIdLogoEmblem}/> */}
      </div>
    );
};
    

export default PreLoader;