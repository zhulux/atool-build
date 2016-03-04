function sendMessage (to: User, message: string): boolean {
  return socket.send(to, message);
}

function sendMessage2 (to, message) {
  return socket.send(to, message);
}