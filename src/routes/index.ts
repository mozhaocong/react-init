import layout from '@/layout'

const context = require.context('../view', true, /^\.\/.*$/)
context.keys()
// 通过遍历数组加载模块
export const mapRouter = {}
context.keys().forEach(filename => {
	const data = filename.split('/')
	if (data.length === 2) {
		mapRouter[filename.replace('./', '')] = context(filename)
	}
})

const routes: any = [
	{
		path: '/',
		component: layout,
		children: []
	}
]
for (const mapKey in mapRouter) {
	const childrenRoutes = { path: mapKey, component: mapRouter[mapKey].default }
	routes[0].children.push(childrenRoutes)
}
export default routes
