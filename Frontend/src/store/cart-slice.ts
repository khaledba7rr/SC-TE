import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CartItem from '../types/cart-items';
import Product from '../types/product';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  allProducts: Product[];
  orderProcessFailed: boolean;
  orderProcessSuccess: boolean;
}


const initialState: CartState = {
  items: [],
  isCartOpen: false,
  allProducts: [],
  orderProcessFailed: false,
  orderProcessSuccess: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {

    addItem(state, action: PayloadAction<CartItem>)
    {

      const sortedAttributes = [...action.payload.attributes].sort((a, b) => a.attribute_id - b.attribute_id);

      const normalizedItem: CartItem = {
        ...action.payload,
        attributes: sortedAttributes
      };

      const existingItem = state.items.find(item =>
        item.productId === normalizedItem.productId &&
        JSON.stringify(item.attributes) === JSON.stringify(normalizedItem.attributes)
      );

      // IF product with the same ID exists before and added to the cart before : 
      if (existingItem)
      {
        // IF product with the same ID exists before with same attributes
        const sortedExistingProductAttributes = [...existingItem.attributes].sort((a, b) => a.attribute_id - b.attribute_id);
        const sortedNewProductAttributes = [...normalizedItem.attributes].sort((a, b) => a.attribute_id - b.attribute_id);

        const areTheSameAttributesExactly = sortedExistingProductAttributes.every((attr, index) => {
          return attr.attribute_id === sortedNewProductAttributes[index].attribute_id && attr.value_id === sortedNewProductAttributes[index].value_id;
        });

        if (areTheSameAttributesExactly)
        {
          existingItem.quantity += normalizedItem.quantity;
          return;
        }

        // IF product with the same ID exists before but with different attributes
        state.items.push(normalizedItem);

        return;
      }

        state.items.push(normalizedItem);

    },

    increaseQuantity(state, action: PayloadAction<CartItem>)
    {

      const sortedAttributes = [...action.payload.attributes].sort((a, b) => a.attribute_id - b.attribute_id);

      const normalizedItem: CartItem = {
        ...action.payload,
        attributes: sortedAttributes
      };
      
      const existingItem = state.items.find(item =>
        item.productId === normalizedItem.productId &&
        JSON.stringify(item.attributes) === JSON.stringify(normalizedItem.attributes)
      );

      if (existingItem)
      {
        existingItem.quantity += 1;
      }
    },

    decreaseQuantity(state, action: PayloadAction<CartItem>)
    {
      
      const sortedAttributes = [...action.payload.attributes].sort((a, b) => a.attribute_id - b.attribute_id);

      const normalizedItem: CartItem = {
        ...action.payload,
        attributes: sortedAttributes
      };
      
      const existingItem = state.items.find(item =>
        item.productId === normalizedItem.productId &&
        JSON.stringify(item.attributes) === JSON.stringify(normalizedItem.attributes)
      );

      if (existingItem && existingItem.quantity > 1)
      {
        existingItem.quantity -= 1;
        return;
      }
      else if (existingItem && existingItem.quantity === 1)
      {
        state.items = state.items.filter((item) => item !== existingItem);
      }
    },
    
    clearCart(state)
    {
      state.items = [];
    },

    closeCart(state)
    {
      state.isCartOpen = false;
    },

    toggleCart(state)
    {
      state.isCartOpen = !state.isCartOpen;
    },

    openCart(state)
    {
      state.isCartOpen = true;
    },

    setAllProducts(state, action: PayloadAction<Product[]>)
    {
      state.allProducts = action.payload;
    },

    setOrderProccessFailed (state , action: PayloadAction<boolean>)
    {
      state.orderProcessFailed = action.payload;
    },

    setOrderProccessSuccess (state , action: PayloadAction<boolean>)
    {
      state.orderProcessSuccess = action.payload;
    }

  },

});

export const { addItem, increaseQuantity, decreaseQuantity, clearCart, closeCart, toggleCart, setAllProducts, openCart , setOrderProccessFailed, setOrderProccessSuccess } = cartSlice.actions;

export default cartSlice.reducer;
