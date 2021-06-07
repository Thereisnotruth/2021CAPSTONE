import React, { useState, useEffect } from 'react';

const Test = () => {
  const [test, setTest] = useState('1234');
  useEffect(() => {
    let socketPath = 'ws://127.0.0.1:8000/ws/helpapp/' + 'abcd';

    const socket = new WebSocket(socketPath);
    socket.onopen = function () {
      socket.send(
        JSON.stringify({
          room_name: 'abcd',
          message: 'efgh',
        }),
      );
    };
  }, [])
  return(
    <div>
      {test}
    </div>
  )
}

export default Test;