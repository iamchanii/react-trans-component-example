import React from 'react';
import './App.css';
import Trans from './Trans';

const message = '반갑습니다 <0>방문객</0>님! 좋은 하루 보내세요!';

const handleClickName = () => {
  alert('Clicked!');
};

const App: React.FC = () => {
  return (
    <div className="App">
      <p>
        <Trans message={message}>
          Welcome <strong onClick={handleClickName}>Stranger</strong>! Have a
          nice day.
        </Trans>
      </p>
    </div>
  );
};

export default App;
