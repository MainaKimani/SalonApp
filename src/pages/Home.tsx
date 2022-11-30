import { IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from './Header'
import Login from './Login'


const Home: React.FC = () => {
  return (
    <IonPage>
      {/* <Header /> */}
      <Login />
    </IonPage>
  );
};

export default Home;
