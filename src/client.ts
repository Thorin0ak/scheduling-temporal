import { Connection, WorkflowClient } from '@temporalio/client';
import { bookingWorkflow } from './workflows/workflows';
import { nanoid } from 'nanoid';
import {logger} from './utils/logger-config';

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new WorkflowClient({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.start(bookingWorkflow, {
    // type inference works! args: [name: string]
    args: ['Temporal'],
    taskQueue: 'hello-world',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  logger.info(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  logger.info(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  // TODO: configure Winston with Temporal
  // https://docs.temporal.io/typescript/logging#customizing-the-default-logger
  // Runtime.install({ logger });
  logger.error(err);
  process.exit(1);
});
