import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import LoginPage from './components/LoginPage';
import Regristration from './components/Regrestrieren/Regristration';
import HomePage from './components/HomePage';
import addNewItemToList from './components/addNewItemToList';



const Navigator = createStackNavigator({
    LoginPage: { screen: LoginPage }, //muss ganz oben stehen
    
    
    Regristration: { screen: Regristration },
    addNewItemToList: { screen: addNewItemToList },
    HomePage: { screen: HomePage },
    
    
});


const App = createAppContainer(Navigator);

export default App;