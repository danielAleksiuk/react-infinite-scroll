import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const App = () => {
  return <>
    <h1>app works</h1>
  </>;
};

ReactDOM
	.createRoot(document.getElementById('root') as Element)
	.render(<App />);