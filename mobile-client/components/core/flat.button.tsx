import { Pressable, Text, View } from "react-native";

interface FlatButtonProps {
  children: any;
  onPress: any;
  style: any;
}

const FlatButton = (props: FlatButtonProps) => {
  const { children, onPress, style } = props;
  return (
    <Pressable onPress={onPress}>
      <View>
        <Text style={style}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default FlatButton;
