import {
    View,
    Text,
    StyleSheet,
    Alert,
    Platform,
    TouchableOpacity,
    FlatList,
    Image,
  } from 'react-native';
import { useCartStore } from '../store/cart-store';
import { StatusBar } from 'expo-status-bar';

export default function Cart()
{
    const {items, removeItem, incrementItem, decrementItem, getTotalPrice} = useCartStore();

    const handleCheckout = () =>
    {
        Alert.alert("Proceeding to checkout", `Total amount: $${getTotalPrice()}`)
    }
    return(
        <View style={styles.container}>
            <StatusBar style={Platform.OS==='android' ? 'light' : 'auto'}/>
            <Text>Cart</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    cartList: {
      paddingVertical: 16,
    },
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    itemDetails: {
      flex: 1,
      marginLeft: 16,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 16,
      color: '#888',
      marginBottom: 4,
    },
    itemQuantity: {
      fontSize: 14,
      color: '#666',
    },
    removeButton: {
      padding: 8,
      backgroundColor: '#ff5252',
      borderRadius: 8,
    },
    removeButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    footer: {
      borderTopWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 16,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    checkoutButton: {
      backgroundColor: '#28a745',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
    },
    checkoutButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#ddd',
      marginHorizontal: 5,
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });