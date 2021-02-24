<template>
  <div id="home">
    <div id="main" class="flex align-center justify-center">
      <div style="width: 80%" class="flex align-center justify-around">
        <a href="/project" style="text-decoration: none">
          <div class="choose-box flex-center">
            <div class="icon-box">
              <img src="../assets/my.png" width="60" height="60">
            </div>
            <div class="text-box">
              项 目
            </div>
          </div>
        </a>
        <a href="/question" style="text-decoration: none">
          <div class="choose-box flex-center">
            <div class="icon-box">
              <img src="../assets/my.png" width="60" height="60">
            </div>
            <div class="text-box">
              题 目
            </div>
          </div>
        </a>
        <a href="/class" style="text-decoration: none">
          <div class="choose-box flex-center">
            <div class="icon-box">
              <img src="../assets/my.png" width="60" height="60">
            </div>
            <div class="text-box">
              班 级
            </div>
          </div>
        </a>
        <a href="/my" style="text-decoration: none">
          <div class="choose-box flex-center">
            <div class="icon-box">
              <img src="../assets/my.png" width="60" height="60">
            </div>
            <div class="text-box">
              个 人
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {}
  }
}
</script>

<style scoped>
#home {
  height: 100%;
  width: 100%;
}

#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}

.choose-box {
  width: 150px;
  height: 150px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px #504d5f;
}

.text-box {
  color: #3589BF;
  margin-top: 10px;
  font-size: 20px;
  font-weight:600;
  word-spacing: 5px;
}
</style>