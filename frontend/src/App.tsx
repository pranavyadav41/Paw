import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';

const App = () => (
  <Router>
     <ChakraProvider>

     <AppRouter/>

     </ChakraProvider>
   
  </Router>
);

export default App
