import { createContext } from 'react';
import { IContext } from '../types';

export const MainContext = createContext<IContext>({
  addGlobalError: () => {},
  removeGlobalError: () => {},
  errorsCheck: false,
});
