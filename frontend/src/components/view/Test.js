import React, { useState, useEffect } from 'react';

const Test = () => {
  const [test, setTest] = useState('1234');
  useEffect(() => {
    let socketPath = 'ws://127.0.0.1:8000/test/1';

    const socket = new WebSocket(socketPath);
    socket.onmessage = function (e) {
      const data = e.data;
      setTest(data);
    }
  }, [])
  return(
    <div>
      {test}
    </div>
  )
}

export default Test;