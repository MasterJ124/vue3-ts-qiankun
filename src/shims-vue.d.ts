/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'nprogress' {
	class NProgress {
		/** 开始加载 */
		static start: function;
		/** 结束加载 */
		static done: function;
	}
	export default NProgress;
}