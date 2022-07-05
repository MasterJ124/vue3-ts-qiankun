interface App {
	/**
	 * name - string - 必选，微应用的名称，微应用之间必须确保唯一。
	 */
	name: string;
	/**
	 * entry - string | { scripts?: string[]; styles?: string[]; html?: string } - 必选，微应用的入口。
	 * 配置为字符串时，表示微应用的访问地址，例如 https://qiankun.umijs.org/guide/。
	 * 配置为对象时，html 的值是微应用的 html 内容字符串，而不是微应用的访问地址。微应用的 publicPath 将会被设置为 /。
	 */
	entry: string;
	/**
	 * container - string | HTMLElement - 必选，微应用的容器节点的选择器或者 Element 实例。如container: '#root' 或 container: document.querySelector('#root')。
	 */
	container: string;
	/**
	 * activeRule - string | (location: Location) => boolean | Array<string | (location: Location) => boolean> - 必选，微应用的激活规则。
	 * 支持直接配置字符串或字符串数组，如 activeRule: '/app1' 或 activeRule: ['/app1', '/app2']，当配置为字符串时会直接跟 url 中的路径部分做前缀匹配，匹配成功表明当前应用会被激活。
	 * 支持配置一个 active function 函数或一组 active function。函数会传入当前 location 作为参数，函数返回 true 时表明当前微应用会被激活。如 location => location.pathname.startsWith('/app1')。
	 */
	activeRule: string;
	/**
	 * loader - (loading: boolean) => void - 可选，loading 状态发生变化时会调用的方法。
	 */
	/**
	 * props - object - 可选，主应用需要传递给微应用的数据。
	 */
}

const apps: Array<App> = [
	{
		name: 'ToolMicroApp',
		entry: '//localhost:8001',
		container: '#container',
		activeRule: '/tool-app'
	}
	// {
	// 	name: 'ViteMicroApp',
	// 	entry: '//localhost:4000',
	// 	container: '#container',
	// 	activeRule: '/vite-app'
	// }
];

export default apps;
