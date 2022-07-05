import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { message } from 'ant-design-vue';

import {
	registerMicroApps,
	addGlobalUncaughtErrorHandler,
	start
} from 'qiankun';
// https://qiankun.umijs.org/zh/api
import apps from './app'; // 子应用注册信息

/**
 * 注册子应用
 * apps - Array<RegistrableApp> - 必选，微应用的一些注册信息
 *
 * lifeCycles - LifeCycles - 可选，全局的微应用生命周期钩子
 * *
 * * type Lifecycle = (app: RegistrableApp) => Promise<any>;
 * *
 * * beforeLoad - Lifecycle | Array<Lifecycle> - 可选
 * * beforeMount - Lifecycle | Array<Lifecycle> - 可选
 * * afterMount - Lifecycle | Array<Lifecycle> - 可选
 * * beforeUnmount - Lifecycle | Array<Lifecycle> - 可选
 * * afterUnmount - Lifecycle | Array<Lifecycle> - 可选
 *
 */
registerMicroApps(apps, {
	// qiankun 生命周期钩子 - 加载前
	beforeLoad: (app) => {
		// 加载子应用前，加载进度条
		NProgress.start();
		console.log('before load', app.name);
		return Promise.resolve();
	},
	// qiankun 生命周期钩子 - 挂载后
	afterMount: (app) => {
		// 加载子应用前，进度条加载完成
		NProgress.done();
		console.log('after mount', app.name);
		return Promise.resolve();
	}
});

/**
 * 添加全局的未捕获异常处理器。
 * handler - (...args: any[]) => void - 必选
 */
addGlobalUncaughtErrorHandler((event: Event | string) => {
	console.error(event);
	const { message: msg } = event as any;
	// 加载失败时提示
	if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
		message.error('子应用加载失败，请检查应用是否可运行');
	}
});

// 导出 qiankun 的启动函数
export default start;
