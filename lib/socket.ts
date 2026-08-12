import { io } from "socket.io-client";
// Use o IP da sua máquina (192.168.1.13) em vez de localhost para os outros aparelhos
export const socket = io("http://192.168.1.13:3001");