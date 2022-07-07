<template>
	<!-- 设置全局化统一样式前缀 -->
	<a-config-provider :locale="locale" prefixCls="main-ant">
		<a-layout>
			<a-layout-header class="header">
				<div class="logo" />
				<a-menu
					v-model:selectedKeys="selectedKeys1"
					theme="dark"
					mode="horizontal"
					:style="{ lineHeight: '64px' }"
				>
					<a-menu-item key="1">
						<router-link to="/">主页</router-link>
					</a-menu-item>
					<a-menu-item key="2">
						<router-link to="/tool-app/creative">lianshan 小工具</router-link>
					</a-menu-item>
					<a-menu-item key="3">
						<router-link to="/tool-app/report-list">导入报表</router-link>
					</a-menu-item>
					<a-menu-item key="4">
						<router-link to="/vite-app">vite 主页</router-link>
					</a-menu-item>
				</a-menu>
			</a-layout-header>
			<a-layout>
				<a-layout-sider width="200" style="background: #fff">
					<a-menu
						v-model:selectedKeys="selectedKeys2"
						v-model:openKeys="openKeys"
						mode="inline"
						:style="{ height: '100%', borderRight: 0 }"
					>
						<a-sub-menu key="sub1">
							<template #title>
								<span>
									<user-outlined />
									subnav 1
								</span>
							</template>
							<a-menu-item key="1">option1</a-menu-item>
							<a-menu-item key="2">option2</a-menu-item>
							<a-menu-item key="3">option3</a-menu-item>
							<a-menu-item key="4">option4</a-menu-item>
						</a-sub-menu>
						<a-sub-menu key="sub2">
							<template #title>
								<span>
									<laptop-outlined />
									subnav 2
								</span>
							</template>
							<a-menu-item key="5">option5</a-menu-item>
							<a-menu-item key="6">option6</a-menu-item>
							<a-menu-item key="7">option7</a-menu-item>
							<a-menu-item key="8">option8</a-menu-item>
						</a-sub-menu>
					</a-menu>
				</a-layout-sider>
				<a-layout style="padding: 24px">
					<a-layout-content>
						<div v-show="$route.name">
							<div id="nav">
								<router-link to="/">Home</router-link>
								|
								<router-link to="/about">About</router-link>
							</div>
							<!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
							<router-view v-show="$route.name" />
						</div>
						<!-- 子应用渲染区，用于挂载子应用节点 -->
						<div v-show="!$route.name" id="container"></div>
					</a-layout-content>
				</a-layout>
			</a-layout>
		</a-layout>
	</a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default defineComponent({
	setup() {
		return {
			selectedKeys1: ref<string[]>(['1']),
			selectedKeys2: ref<string[]>(['1']),
			collapsed: ref<boolean>(false),
			openKeys: ref<string[]>(['sub1'])
		};
	},
	data() {
		return {
			locale: zhCN
		};
	}
});
</script>

<style lang="less">
#main-app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
.ant-layout {
	height: 100%;
}

.logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}

.site-layout-background {
	background: #fff;
}
</style>
