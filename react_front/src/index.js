import React from 'react';
import ReactDOM from 'react-dom';
import ParticlesBg from 'particles-bg'
import App from "./app";

ReactDOM.render(
  <>
    <App />
    <ParticlesBg type="cobweb" num="30" color="#a6a4ad" bg={true} />
  </>,
  document.getElementById('root')
);
