import { create } from "zustand";

type CartItemType = {
    id: number;
    title: string;
    heroImage: string;
    price: number;
    quantity: number;
    maxQuantity: number;
  };

type CartState = {
    items: CartItemType[];
    addItem: (item: CartItemType) => void;
    removeItem: (id: number) => void;
    incrementItem: (id: number) => void;
    decrementItem: (id: number) => void;
    getTotalPrice: () => string;
    getItemCount: () => number;
    
  };
  

  const initialCartItems: CartItemType[] = [];

export const useCartStore = create<CartState>((set,get)=>({
    items: initialCartItems,
    addItem: (item: CartItemType) => {
        const existingItem =get().items.find(i=>i.id===item.id);
        if(existingItem) {

        }  else {
         set(state => ({ items: [...state.items, item] }));
            
        }   
    },
    removeItem:() =>null,
    incrementItem:() =>null,
    decrementItem:()=> null,
    getTotalPrice:()=>'',
    getItemCount:()=>0,
    

}));