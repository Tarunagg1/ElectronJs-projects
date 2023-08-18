import React from 'react';

export const Work: React.FC = () => {
  const electron = (window as any).electron;

  return <div>
    <p>this is work page</p>
    <h1>Work page</h1>
    {/* Home diirectory id @{electron.homeDir()} */}
  </div>;
};
