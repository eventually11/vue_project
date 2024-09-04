<template>
  <div style="display: flex">
    <div style="height: 100vh">
      <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#426871"
          class="el-menu-vertical-demo"
          text-color="#fff"
          default-active="/"
          @select="handleSelect"
          style="height: 100%;"
      >
        <el-menu-item index="/">
          <el-icon>
            <Menu/>
          </el-icon>
          <span>Global</span>
        </el-menu-item>
        <el-menu-item index="/daily">
          <el-icon>
            <document/>
          </el-icon>
          <span>Daily monitoring</span>
        </el-menu-item>
        <el-menu-item index="/map">
          <el-icon>
            <setting/>
          </el-icon>
          <span>Map Visualization</span>
        </el-menu-item>
      </el-menu>
    </div>
    <RouterView/>
  </div>
</template>

<script setup>
const handleSelect = (a) => {
  if (a === '/') {
    window.location.reload()
  }
}
</script>

