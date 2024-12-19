// 监听父进程发送的消息
const { exec } = require('child_process')
const path = require('path')

process.on('message', async message => {
	console.log('子进程收到消息：', message)
	console.log('__dirname', path.join(__dirname, '../'))
	await new Promise((resolve, reject) => {
		exec(`npm run node --prefix ${path.join(__dirname, '../')}`, (error, stdout, stderr) => {
			if (error) {
				console.error('启动项目2时发生错误：', error)
				resolve(true)
				return
			}
			resolve(true)
		})
	})

	// 向父进程发送消息
	process.send('Hello from child process!')
})
