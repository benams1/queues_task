const queues = {}
const pushMessage = (queueName, message) => {
  if (typeof queueName !== 'string') throw new Error('bad queue name');
  if (typeof message !== 'object') throw new Error('bad message type');

  if (!queues[queueName]) {
    queues[queueName] = [];
  }
  queues[queueName].push(message)
  return true;
};

const popMassage = (queueName) => {
  if (!queues[queueName]) throw new Error('queue is not exist');
  if (!queues[queueName].length) throw new Error('queue is empty');

  return queues[queueName].shift();
}

module.exports = {
  pushMessage,
  popMassage,
}