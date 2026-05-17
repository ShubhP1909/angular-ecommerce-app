import { createFeatureSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";

export const selectCart = createFeatureSelector<CartState>('cart')