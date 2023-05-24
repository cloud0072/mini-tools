<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" :style="{width: collapsed ? '32px': '100%'}">
        <img class="logo-img" :src="logoImage" alt=""/>
        <div class="logo-name">Dev Tools</div>
      </div>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item :key="route.name" v-for="(route) in menus" @click="onClick(route)">
          <component :is="route.meta.icon"></component>
          <span style="font-size: 16px">{{ route.meta?.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="main-layout">
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
      </a-layout-header>
      <a-layout-content :style="{ margin: '16px', padding: '24px', background: '#fff', height: '100%' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {ref} from "vue";
import {menus} from "@/router";
import logoImage from '@/assets/logo.png';
// import {MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined,DeleteOutlined} from '@ant-design/icons-vue';
import * as icons from '@ant-design/icons-vue';
import {useRouter} from "vue-router";

export default {
  name: "SideBarLayout",
  components: {
    ...icons
  },
  setup() {
    const collapsed = ref(true)
    const selectedKeys = ref([])

    const router = useRouter();
    const onClick = route => {
      router.push({path: route.path})
    }

    return {
      collapsed,
      selectedKeys,
      logoImage,
      menus,
      onClick,
    }
  }
}
</script>

<style lang="less">
#app {
  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-overflow: clip;
    overflow: hidden;
    margin: 16px 0;
    padding: 0 24px;
    transition: 0.3s ease;
  }

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-name {
    flex-shrink: 0;
    font-size: 20px;
    font-weight: 600;
    color: white;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>