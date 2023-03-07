import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import LoginPage from './components/LoginPage';
import Regristration from './components/Regrestrieren/Regristration';
import HomePage from './components/HomePage';
import addNewItemToList from './components/addNewItemToList';
import editObject from './components/editObject';


const Navigator = createStackNavigator({
  addNewItemToList: { screen: addNewItemToList },
  editObject: {screen: editObject},
  HomePage: { screen: HomePage },
  Regristration: { screen: Regristration },
  LoginPage: { screen: LoginPage },
  
});



const App = createAppContainer(Navigator);

export default App;