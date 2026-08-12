import { Server } from "socket.io";
import { createServer } from "http";

// Cria o servidor HTTP
const httpServer = createServer();

// Inicializa o Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Permite conexão de qualquer aparelho na rede
    methods: ["GET", "POST"]
  }
});

// Tipagem das mensagens (o benefício que você queria)
interface ChatMessage {
  user: string;
  text: string;
  timestamp: number;
}

io.on("connection", (socket) => {
  console.log(`Dispositivo conectado: ${socket.id}`);

  // Recebe a mensagem de um aparelho
  socket.on("send-message", (data: ChatMessage) => {
    console.log("Mensagem recebida:", data);
    
    // Repassa para todos os outros aparelhos conectados
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("Dispositivo desconectado");
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Servidor de Chat rodando em http://192.168.1.13:${PORT}`);
});