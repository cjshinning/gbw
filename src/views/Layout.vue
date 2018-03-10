<template>
    <div class="nav">
        <el-col :span="24" class="nav-main">
            <aside class="menu-expanded">
                <el-row class="tac">
                    <el-col>
                        <el-menu :default-active="$route.path" router unique-opened background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                            <template v-for="(item,index) in $router.options.routes">
                                <el-submenu :index="index+''" v-show="item.name" v-if="item.path=='/'" :key="index">
                                    <template slot="title">
                                        {{item.name}}
                                    </template>
                                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                                        {{child.name}}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                        </el-menu>
                    </el-col>
                </el-row>
                <!-- <el-menu default-active="1" class="el-menu-vertical-demo" unique-opened @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>卡券</span>
                        </template>
                        <el-menu-item index="/card">卡券列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>平台</span>
                        </template>
                        <el-menu-item index="/platform" @click="handleNav()">平台列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <span>记录</span>
                        </template>
                        <el-menu-item index="/record">所有记录列表</el-menu-item>
                        <el-menu-item index="/activityRecord">当前活动列表</el-menu-item>
                        <el-menu-item index="/testRecord">活动测试列表</el-menu-item>
                    </el-submenu>
                </el-menu> -->
            </aside>
            <section class="nav-content">
                <el-row class="top-nav">
                    <el-col :span="20">
                        <div class="crumb">
                            <el-breadcrumb class="app-levelbar" separator="/">
                                <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
                                    <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">
                                        {{item.name}}
                                    </router-link>
                                    <router-link v-else :to="item.path">{{item.name}}</router-link>
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                当前用户{{this.$store.state.user.name}}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <router-link to="/card">首页</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <span @click="handleLogout()">退出</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>

                <router-view></router-view>
            </section>
        </el-col>
    </div>
</template>

<script>
import { logout } from '@/api/api.js'

export default {
  name: 'layout',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleNav(index) {
    //     console.log(this.$router);
    //   this.$router.push({ path: '/record' })
    //   console.log(index)
    //   //   this.$router.push(index);
    // },
    getBreadcrumb() {
      //   let matched = this.$route.matched.filter(item => item.name);
      let matched = this.$route.matched
      const first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/card', icon: 'home' }].concat(
          matched
        )
      }
      this.levelList = matched
    },
    handleLogout() {
      // logout().then(res=>{
      //     console.log(res);
      //     if(res.data.status === 200){
      //         this.$cookie.delete('username');
      //         this.$router.push({path: '/login'});
      //     }else{
      //         alert(res.msg);
      //     }
      // })
      this.$store.dispatch('Logout')
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.top-nav {
  padding: 20px;
  background: #eef1f6;
}
</style>
