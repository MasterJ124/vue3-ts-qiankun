import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { message } from 'ant-design-vue';

import {
	registerMicroApps,
	addGlobalUncaughtErrorHandler,
	start,
	initGlobalState,
	MicroAppStateActions
} from 'qiankun';
// https://qiankun.umijs.org/zh/api

import apps from './app'; // 子应用注册信息

/**
 * 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
 *
 * MicroAppStateActions
 * * onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void， 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
 * * setGlobalState: (state: Record<string, any>) => boolean， 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
 * * offGlobalStateChange: () => boolean，移除当前应用的状态监听，微应用 umount 时会默认调用
 */

const state = {
	token: 'b18d618b88de990e6c3cf52056ca6106'
};
// 初始化 state
const actions: MicroAppStateActions = initGlobalState({});

actions.onGlobalStateChange((state, prev) => {
	// state: 变更后的状态; prev 变更前的状态
	console.log('全局状态 父应用', state, prev);
});

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
		sessionStorage.setItem('token', state.token);
		NProgress.start();
		console.log('before load', app.name);
		return Promise.resolve();
	},
	// qiankun 生命周期钩子 - 挂载前
	beforeMount: (app) => {
		console.log('before mount', app.name);
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
