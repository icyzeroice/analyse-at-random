const first = require('./ee-first')

const EventEmitter = require('events')

let ee = new EventEmitter(),
    eer = new EventEmitter(),
    arr = [
      [ee, 'yes', 'emm', 'error'],
      [ee, 'test', 'error'],
      [eer, 'sss']
    ]

first(
  arr,
  (err, ee, event, args) => {
    console.log('err', err)
    console.log('ee', ee)
    console.log('event', event)
    console.log('args', args)
  }
)


eer.emit('sss', 3)

ee.emit('yes', {
  'ddd': '344'
})

ee.emit('yes', {
  'ddd': '335'
})

ee.emit('test', {
  err: 1
})
