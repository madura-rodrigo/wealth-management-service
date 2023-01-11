import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import InvestmentScreen from "../screens/investments.screen";
import SummaryScreen from "../screens/summary.screen";

const AuthenticatedNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="summary">
        <Tab.Screen name="summary" component={SummaryScreen}></Tab.Screen>
        <Tab.Screen
          name="investments"
          component={InvestmentScreen}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedNavigator;
