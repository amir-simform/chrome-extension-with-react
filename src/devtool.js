import React from 'react';
import ReactDOM from 'react-dom/client';
chrome.devtools.panels.create("My panel", "icon32.png", "devtool.html", function() {

const Popup = () => {
  const handleClick = () => {
    alert('Hello from React Extension Popup!');
  };

  return (
    <div style={{ width: "400px", height: "500px" }}>
      <h1>My Browser Extension Popup</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Popup />);})