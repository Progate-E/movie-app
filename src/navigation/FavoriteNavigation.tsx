import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from '../screens/Favorites';
import Detail from '../screens/Detail';

export type RootStackParamList = {
  Favorites: undefined;
  MovieDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="MovieDetail" component={Detail} />
    </Stack.Navigator>
  );
}
