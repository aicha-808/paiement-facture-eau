import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store'; // Adaptez le chemin à la localisation de votre store

// Typer useDispatch avec AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typer useSelector avec RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
