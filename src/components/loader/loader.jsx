import React from 'react';

import Loader from "react-loader-spinner";

function loader(){

    return (
      <Loader
        type="Bars"
        color="#00BFFF"
        height={40}
        width={50}
        timeout={5000} //3 secs
      />
    );
  
}

export default loader;