import create from 'zustand';
import {getDistance} from './utility';

interface IARState {
  isARStarted: boolean;
  startAR(): void;
  stopAR(): void;

  initialized: boolean;
  setInitialized(initialized: boolean): void;

  node1Coord: number[] | null;
  setNode1Coord(node1Coord: number[] | null): void;

  node2Coord: number[] | null;
  setNode2Coord(node2Coord: number[] | null): void;

  distance: number | null;
  setDistance(coordOne: number[], coordTwo: number[]): void;
}

const useARState = create<IARState>(set => ({
  isARStarted: false,
  startAR: () => set({isARStarted: true}),
  stopAR: () => set({isARStarted: false}),

  initialized: false,
  setInitialized: initialized => set({initialized}),

  node1Coord: null,
  setNode1Coord: node1Coord => set({node1Coord}),

  node2Coord: null,
  setNode2Coord: node2Coord => set({node2Coord}),

  distance: null,
  setDistance: (coordOne, coordTwo) =>
    set({distance: getDistance(coordOne, coordTwo)}),
}));

export default useARState;
