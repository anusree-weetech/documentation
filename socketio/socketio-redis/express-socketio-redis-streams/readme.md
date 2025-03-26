### **What is `@socket.io/redis-streams-adapter`?**  
🚀 **`@socket.io/redis-streams-adapter` is an experimental adapter that uses Redis Streams instead of Pub/Sub for message synchronization across multiple Socket.IO servers.**  

---

### **1️⃣ How is `@socket.io/redis-streams-adapter` Different from `@socket.io/redis-adapter`?**  

| Feature                          | `@socket.io/redis-adapter` (Pub/Sub) | `@socket.io/redis-streams-adapter` (Streams) |
|----------------------------------|-------------------------------------|-------------------------------------|
| **Message Delivery Guarantee**   | ❌ No guarantee (messages can be lost if a server is down) | ✅ Messages are stored & can be read later |
| **Supports Message Persistence?** | ❌ No (Pub/Sub messages are volatile) | ✅ Yes (Redis Streams keeps messages until read) |
| **Handling Server Restarts**      | ❌ If a server is down, it misses messages | ✅ A new server can read missed messages |
| **Scalability**                   | ✅ Good for real-time apps | ✅ Good for real-time + fault-tolerant apps |
| **Complexity**                    | 🟢 Simple | 🔴 More complex |


---

### **3️⃣ Example Usage of `@socket.io/redis-streams-adapter`**
```javascript
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-streams-adapter');
const { Server } = require('socket.io');

const io = new Server(3000);

const redisClient = createClient({ url: 'redis://localhost:6379' });
await redisClient.connect();

io.adapter(createAdapter(redisClient, { streamName: 'socket.io-stream' }));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('message', (msg) => {
    console.log(`Received: ${msg}`);
    io.emit('message', msg); // Broadcast message to all clients
  });
});
```
