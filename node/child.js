const net = require('net')

const { exec } = require('child_process')

const src = 'babelSrc/index.tsx'

// 创建服务器
const server = net.createServer(socket => {
	console.log('客户端已连接')

	// 监听客户端发送的数据
	socket.on('data', data => {
		console.log('服务器收到消息：', data.toString())

		// 执行脚本命令
		exec('npm run node', (error, stdout, stderr) => {
			if (error) {
				console.error('启动项目2时发生错误：', error)
				return
			}
			console.log('项目2启动输出：', stdout)
		})

		// 向客户端发送消息
		socket.write('Hello from server!')
	})
})

// 监听端口
server.listen(8080, () => {
	console.log('服务器已启动，监听端口 8080')
})
