<template>
  <div class="test" @tap="toSaveRoleAction">保存身份
    <div class="btn" @tap="toSave2">同步数据</div>
    <div class="btn2" @tap="getRole">获取身份</div>
    <div class="line" v-if="flag"></div>
    <div class="box" v-for="(val,key,index) in list" :key="index">{{val}}-{{key}}</div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  // import api from 'api'
  import Toast from '@/components/toast/toast'
  import { ROLE } from '../../common/js/contants'

  export default {
    data () {
      return {
        flag: true,
        list: new Array(7).fill(0)
      }
    },
    created () {
      // console.log(this)
      // console.log(mapMutations, '0000000')
      // console.log(mapMutations.state.test)
    },
    methods: {
      ...mapGetters(['role']),
      getRole () { // 获取数据
        console.log(this.role(), '获取数据')
      },
      ...mapActions(['saveRole']),
      toSaveRoleAction () { // 异步-同步操作
        this.saveRole(ROLE.SHOP_ID + '商家')
        console.log('action动作....')
      },
      ...mapMutations({ // 同步
        roleSync: 'ROLE_TYPE'
      }),
      toSave2 () {
        this.roleSync(ROLE.STAFF_ID + '员工')
        console.log('=============')
      }
    },
    // methods: {
    //   test22 () {
    //     console.log(222)
    //     this.flag = !this.flag
    //     this.$refs.toast.show('lahksdoi')
    //   },
    //   testMutations () {
    //     let a = this.test()
    //     console.log(a)
    //   },
    //   testActions () {
    //     this.saveTest(2)
    //   },
    //   ...mapMutations({
    //     // test: 'TEST_TYPE',
    //     role: 'ROLE'
    //   }),
    //   ...mapGetters([
    //     'role'
    //   ]),
    //   ...mapActions([
    //     // 'saveTest',
    //     'saveRole'
    //   ]),
    //   testSaveRole () {
    //     this.saveRole(ROLE.STAFF_ID)
    //   },
    //   testRole () {
    //     console.log(this.role(), '.............')
    //   }
    // },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .test
    color: #831992
    font-size: 20px
    .btn
      normal-button-default()
      cut-off-rule-bottom(#000)
    .btn2
      function-button()
    .line
      background-color: yellow
      margin: 50px auto
      height: 50px
      cut-off-rule-top(#f00, 10%, 10%)
    .box
      height: 100px
      width: 100px
      background-color: red
      margin: 10px


</style>
