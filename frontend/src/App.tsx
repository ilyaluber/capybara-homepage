import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from './app/store/states/types';
import { authorise } from './app/store/states/domainData/slices/auth/auth';
import Capybara from './app/Components/Capybara/Capybara';
import Overlay from './app/Components/Overlay/Overlay';
import { Overlay as OverlayState } from './app/store/states/ui/slices/overlay/types';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/api/current_user');
      const data = await res.json();
      dispatch(authorise(data.name));
      console.log(data);
    })();
  }, []);

  const { type, data, isActive }: OverlayState = useSelector((state: State) => state.ui.overlay);

  return (
    <div className="App">
      <Capybara isOverlayed={isActive} />
      <Overlay type={type} data={data} isActive={isActive} />
    </div>
  );
};

export default App;
