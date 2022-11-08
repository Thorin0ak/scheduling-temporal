import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import {providerActivities} from './activities';

async function run() {
  // Initialize DB connection
  const db = 'mongodb-connection-client';

  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows/workflows'),
    activities,
    taskQueue: 'hello-world',
  });

  const worker2 = await Worker.create({
    taskQueue: 'provider-search',
    // here we pass the db client handle
    activities: providerActivities(db),
    workflowsPath: require.resolve('./workflows/workflows'),
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `hello-world` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
