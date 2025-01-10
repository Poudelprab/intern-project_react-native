import React, { useState } from 'react';
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
import { useCartStore } from '../store/cart-store';  // Ensure this is a valid hook
import { StatusBar } from 'expo-status-bar';
import { createOrder, createOrderItem } from '../api/api';

// Define types for cart items
type CartItemProps = {
  id: number;
  heroImage: string;
  title: string;
  price: number;
  quantity: number;
};

type CartItemComponentProps = {
  item: CartItemProps;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

const bankDetails = {
  bank: 'Nabil Bank Limited, Taalchowk Branch',
  accountNumber: '060100015678945',
  phoneNumber: '9800000010',
  accountHolder: 'Ram Lal Tiwari',
};

const CartItem = ({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemComponentProps) => (
  <View style={styles.cartItemContainer}>
    <Image source={{ uri: item.heroImage }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>Rs {item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => onDecrement(item.id)} style={styles.quantityButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onIncrement(item.id)} style={styles.quantityButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Cart() {
  const {
    items,
    removeItem,
    incrementItem,
    decrementItem,
    getTotalPrice,
    resetCart,
  } = useCartStore();
  const [showBankDetails, setShowBankDetails] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    setShowBankDetails(true);
  };

  const { mutateAsync: createSupabaseOrder } = createOrder({ totalPrice: 0 });
  const { mutateAsync: createSupabaseOrderItem } = createOrderItem();

  const handleConfirmPayment = async () => {
    const totalPrice = parseFloat(getTotalPrice());
    // totalPrice is already a number
  
    if (isNaN(totalPrice) || totalPrice <= 0) {
      Alert.alert('Error', 'Invalid total price');
      return;
    }
  
    try {
      const orderData = await createSupabaseOrder({ totalPrice });  // Pass correct argument
      if (!orderData || !('id' in orderData)) {
        throw new Error('Order creation failed');
      }
  
      await createSupabaseOrderItem(
        items.map((item) => ({
          orderId: orderData.id, 
          productId: item.id,
          quantity: item.quantity,
        }))
      );
  
      Alert.alert('Success', 'Payment confirmed successfully.');
      resetCart();
      setShowBankDetails(false);
    } catch (error) {
      console.error('Error confirming payment:', error);
      Alert.alert('Error', 'Failed to confirm payment.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'android' ? 'light' : 'auto'} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
          />
        )}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rs {getTotalPrice()}</Text>
        {!showBankDetails ? (
          <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.bankDetailsText}>Please deposit the total amount to the following bank:</Text>
            <Text style={styles.bankDetailsText}>Bank: {bankDetails.bank}</Text>
            <Text style={styles.bankDetailsText}>Account Number: {bankDetails.accountNumber}</Text>
            <Text style={styles.bankDetailsText}>Phone Number: {bankDetails.phoneNumber}</Text>
            <Text style={styles.bankDetailsText}>Account Holder: {bankDetails.accountHolder}</Text>
            <TouchableOpacity onPress={handleConfirmPayment} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  cartList: {
    padding: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemDetails: {
    flex: 1,
    padding: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  checkoutButton: {
    padding: 16,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bankDetailsText: {
    fontSize: 14,
    marginBottom: 8,
  },
  confirmButton: {
    padding: 16,
    backgroundColor: '#2196f3',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
