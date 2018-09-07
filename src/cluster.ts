import cluster from 'cluster';
import os from 'os';
import Server from './services/Server';

const cpus: number = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = new Server(8000);
  app.run();

  console.log(`Worker ${process.pid} started`);
}
