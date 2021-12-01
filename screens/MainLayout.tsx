import React from "react";
import { View, Animated } from "react-native";
import IconTextButton from "../components/IconTextButton";
import { COLORS, SIZES, icons } from "../constants";
import { connect } from "react-redux";
const MainLayout = ({ children, isTradeModalVisible }: any) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 350],
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}

      {/** DIm the background */}

      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
            opacity: modalAnimatedValue,
          }}
        />
      )}

      {/**Modal */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("send pressed")}
        />
        <IconTextButton
          label="Widthdraw"
          icon={icons.withdraw}
          onPress={() => console.log("withdraw pressed")}
          containerStyle={{
            marginTop: SIZES.base,
          }}
        />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  isTradeModalVisible: state.tabReducer.isTradeModalVisible,
});

export default connect(mapStateToProps)(MainLayout);
