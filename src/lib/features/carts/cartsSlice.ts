import { compareArrays } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  name: string;
  src_url: string;
  price: number;
  attributes: string[];
  discount: number;
  quantity: number;
};

export type RemoveCartItem = {
  id: number;
  attributes: string[];
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
}

const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
  let totalPrice = 0;
  let adjustedTotalPrice = 0;
  let totalQuantities = 0;

  for (const item of items) {
    totalPrice += item.price * item.quantity;
    const itemPriceWithDiscount =
      item.discount > 0
        ? Math.round(item.price - (item.price * item.discount) / 100)
        : item.price;
    adjustedTotalPrice += itemPriceWithDiscount * item.quantity;
    totalQuantities += item.quantity;
  }

  return { totalPrice, adjustedTotalPrice, totalQuantities };
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const items = state.cart?.items ? [...state.cart.items] : [];

      const existingItemIndex = items.findIndex(
        (item) =>
          item.id === newItem.id &&
          compareArrays(item.attributes, newItem.attributes)
      );

      if (existingItemIndex > -1) {
        const existingItem = items[existingItemIndex];
        items[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
        };
      } else {
        items.push(newItem);
      }

      // ANOTAÇÃO: Recalcula os totais a partir do array de itens atualizado
      const { totalPrice, adjustedTotalPrice, totalQuantities } =
        calculateTotals(items);

      state.cart = { items, totalQuantities };
      state.totalPrice = totalPrice;
      state.adjustedTotalPrice = adjustedTotalPrice;
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const { id, attributes } = action.payload;
      const items = [...state.cart.items];

      const existingItemIndex = items.findIndex(
        (item) => item.id === id && compareArrays(item.attributes, attributes)
      );

      if (existingItemIndex > -1) {
        const existingItem = items[existingItemIndex];
        if (existingItem.quantity > 1) {
          items[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
        } else {
          items.splice(existingItemIndex, 1);
        }
      }

      const { totalPrice, adjustedTotalPrice, totalQuantities } =
        calculateTotals(items);

      state.cart = { items, totalQuantities };
      state.totalPrice = totalPrice;
      state.adjustedTotalPrice = adjustedTotalPrice;
    },

    clearCart: (state) => {
      state.cart = null;
      state.totalPrice = 0;
      state.adjustedTotalPrice = 0;
    },

    remove: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const { id, attributes } = action.payload;

      const updatedItems = state.cart.items.filter(
        (item) =>
          !(item.id === id && compareArrays(item.attributes, attributes))
      );

      const { totalPrice, adjustedTotalPrice, totalQuantities } =
        calculateTotals(updatedItems);

      state.cart = { items: updatedItems, totalQuantities };
      state.totalPrice = totalPrice;
      state.adjustedTotalPrice = adjustedTotalPrice;
    },
  },
});

export const { addToCart, removeCartItem, remove, clearCart } =
  cartsSlice.actions;

export default cartsSlice.reducer;
