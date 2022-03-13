import { Client } from "./client.js";
import { Server } from "./server.js";

(async function main() {

  // create server
  try {
    new Server();
  } catch (error) {
    console.error("Error trying to create server", error);
  }

  // create client
  try {
    await new Client().get();
  } catch (error) {
    console.error("Error trying to create client and consume server");
  }

})();
