const queuesHandler = require('../queue')
const status = require('http-status');

const addMessage = (req, res) => {
  const {
    params: { queue_name } = {},
    body: message,
  } = req
  if (!queue_name || !message) return res.status(status.BAD_REQUEST).json({ error: 'bad request' });

  try{
    queuesHandler.pushMessage(queue_name, message);
    res.sendStatus(status.OK)
  } catch (e) {
    res.status(status.BAD_REQUEST).json({ error: e.message})
    console.log('e', e);
  }
};

const getMessage = (req, res) => {
  const {
    params: { queue_name } = {},
    query: { timeout } = {}
  } = req
  let flag = false;
  const to = isNaN(timeout) ? 10 * 1000 : parseInt(timeout) ;
  const timeOutHandler = setTimeout(() => {
    flag = true;
    res.sendStatus(status.NO_CONTENT)
  }, to);
  try {
    const message = queuesHandler.popMassage(queue_name)
    if (!flag){
      clearTimeout(timeOutHandler);
      res.status(status.OK).json({ message })
    }
  } catch (e) {
    console.log('error during pop from queue: ', e.message)
  }
};

module.exports = {
  addMessage,
  getMessage,
}