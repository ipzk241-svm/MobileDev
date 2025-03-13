import {
  Dimensions,
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

const GameCard = ({ game }) => {
  return (
    <ImageBackground
      source={game.image}
      style={styles.gameItem}
      resizeMode="cover"
    >
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle}>{game.title}</Text>
        <Text style={styles.description}>{game.info}</Text>

        <View style={styles.priceContainer}>
          {game.discount > 0 && (
            <Text style={[styles.discount, styles.priceBox]}>
              -{Math.round(game.discount * 100)}%
            </Text>
          )}

          <View style={[styles.price, styles.priceBox]}>
            {game.discount > 0 && (
              <Text style={styles.oldPrice}>$ {Math.round(game.price)}</Text>
            )}
            <Text style={styles.newPrice}>
              $ {Math.round(game.price - game.price * game.discount)}
            </Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.icon}
        source={require("../assets/images/windows_icon.png")}
      ></Image>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gameItem: {
    width: width - 60,
    height: 230,
    marginRight: 16,
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  gameInfo: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    gap: 5,
  },
  gameTitle: {
    fontFamily: "ABeeZee-Regular",
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontFamily: "ABeeZee-Regular",
    color: "rgb(240, 228, 228)",
    fontSize: 13,
    overflow: "visible",
  },
  priceBox: {
    color: "rgb(255, 255, 255)",
    fontSize: 12,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 6,
    borderRadius: 3,
  },
  discount: {
    backgroundColor: "rgba(5, 238, 1, 0.5)",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  priceContainer: {
    width: "auto",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 0,
  },
  price: {
    backgroundColor: "rgba(0, 0, 0, 0.64)",
    flexDirection: "row",
    fontFamily: "pingfang-sc-regular",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    fontFamily: "pingfang-sc-regular",
    color: "rgb(221, 214, 214)",
    fontSize: 12,
  },
  newPrice: {
    color: "rgb(255, 255, 255)",
    fontFamily: "pingfang-sc-regular",
    fontSize: 12,
    paddingLeft: 5,
  },
  icon: {
    width: 16.5,
    height: 16.5,
    marginRight: 10,
    marginBottom: 20,
  },
});

export default GameCard;
