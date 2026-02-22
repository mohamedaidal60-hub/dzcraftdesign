import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
    slug: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    total: () => number;
    count: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => {
                const items = get().items;
                const existingId = items.find(
                    (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
                )?.id;

                if (existingId) {
                    set({
                        items: items.map((i) =>
                            i.id === existingId ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                        isOpen: true,
                    });
                } else {
                    const id = `${item.productId}-${item.size || ''}-${item.color || ''}-${Date.now()}`;
                    set({ items: [...items, { ...item, id }], isOpen: true });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },

            updateQuantity: (id, quantity) => {
                if (quantity < 1) {
                    get().removeItem(id);
                    return;
                }
                set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)) });
            },

            clearCart: () => set({ items: [] }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set({ isOpen: !get().isOpen }),

            total: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
            count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
        }),
        { name: 'dzcraftdesign-cart' }
    )
);
