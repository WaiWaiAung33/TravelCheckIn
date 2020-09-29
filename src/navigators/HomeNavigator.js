import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "@screens/dashboard/Home";
import Create from "@screens/dashboard/Create";
import ToleGate from "@screens/dashboard/ToleGate";
import TravelNote from "@screens/dashboard/TravelNote";
import TravelNoteDetail from "@screens/dashboard/TravelNoteDetail";
import ToleGateList from "@screens/dashboard/ToleGateList";
import Edit from "@screens/dashboard/Edit";
import TravelQr from "@screens/dashboard/TravelQr";
import CreateNew from "@screens/dashboard/CreateNew";
export default createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Create: {
        screen: Create,

        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      ToleGate: {
        screen: ToleGate,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      CreateNew: {
        screen: CreateNew,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },

      TravelNote: {
        screen: TravelNote,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      ToleGateList: {
        screen: ToleGateList,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      TravelNoteDetail: {
        screen: TravelNoteDetail,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Edit: {
        screen: Edit,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      TravelQr: {
        screen: TravelQr,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteName: "Home",
    }
  )
);
