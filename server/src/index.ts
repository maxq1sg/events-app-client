import App from "./app";
import setupDB, { EMode } from "./setupDb";

const server = setupDB(EMode.DEV).then(() => {
  new App().startServer();
});

export default server;
