import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, icons } from "../constants";
import Home from "../screens/Home";
import Portfolio from "../screens/Portfolio";
import Market from "../screens/Market";
import Profile from "../screens/Profile";
import TabIcon from "../components/TabIcon";

import { connect } from "react-redux";
import { setTradeModalVisibility } from "../stores/tab/tabActions";

const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({ children, onPress }: any) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
const Tabs = ({ isTradeModalVisible, setTradeModalVisibility }: any) => {
  function tradeTabButtonOnClickHandler() {
    setTradeModalVisibility(!isTradeModalVisible);
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
          height: 140,
        },
      }}
    >
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              !isTradeModalVisible && (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              )
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        component={Portfolio}
        name="Portfolio"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              !isTradeModalVisible && (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              )
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        component={Home}
        name="Trade"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                label="Trade"
                isTrade={true}
                iconStyle={
                  isTradeModalVisible
                    ? {
                        width: 15,
                        height: 15,
                      }
                    : {}
                }
              />
            );
          },
          tabBarButton: (props) => {
            return (
              <TabBarCustomButton
                {...props}
                onPress={tradeTabButtonOnClickHandler}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={Market}
        name="Market"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              !isTradeModalVisible && (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              )
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              !isTradeModalVisible && (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              )
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state: any) => ({
  isTradeModalVisible: state.tabReducer.isTradeModalVisible,
});

const mapDispatchToProps = (dispatch) => ({
  setTradeModalVisibility: (isVisible: boolean) =>
    dispatch(setTradeModalVisibility(isVisible)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
