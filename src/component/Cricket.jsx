import React, { useEffect } from 'react';

function Cricket() {
    
    
    ////////////////////////////
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdorgapi.b-cdn.net/widgets/score.js';
    script.async = true;
    document.body.appendChild(script);
 
   
  }, []);

  return (
    <div>
      <h1>Cricket</h1>
      {/* The external script will handle rendering its content */}
    </div>
  );
}

export default Cricket;