import React from 'react';

function ViewMessage({ message }) {
  return (
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="from">De:</label>
        {/* <input type="text" className="form-control" id="from" value="Admin" readOnly /> */}
        <div>Admin</div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        {/* <textarea
          className="form-control"
          id="message"
          rows="4"
          value={message}
          readOnly
        /> */}
        <div>{message}</div>
      </div>
    </div>
  );
}

export default ViewMessage;

