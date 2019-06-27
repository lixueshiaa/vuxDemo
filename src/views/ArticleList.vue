<template>
  <div>
    <group>
      <cell title="模板渲染" value="value" link="/detail"></cell>
      <cell title="指令" is-link link="/detail"></cell>
      <cell title="组件,表单控件" value="value"></cell>
      <cell title="状态管理" value="value"></cell>
      <cell title="webpack构建工具" value="value"></cell>
      <cell title="你需要一款强大的IDE环境 webstrom " value="value"></cell>
    </group>
    <div class="pad20">{{time}}</div>
    <div>{{time | formatDate('yyyy-MM-dd')}}</div>
  </div>
</template>

<script>
    import { Group, Cell, Toast } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    import { account as ajax } from '@/services'
import { setTimeout } from 'timers';

    export default {
      components: {
        Group,
        Cell
      },
      data () {
        return {
          page: 1,
          limit: 20,
          time: new Date()
        }
      },
      mounted () {
        console.log(1111, Toast)
        this.setAuth('resdf')
        this.onRefresh()
        console.log(44444444, this.getToken)
        ajax.auth({mm: 22, loading: true}).catch(err => {
          setTimeout(() => {
            ajax.auth({mm: 28, loading: true})
          }, 3000)
        })
      },

      methods: {
        ...mapActions([
          'setAuth'
        ]),
        onRefresh () {
        }
      },
      computed: {
        ...mapGetters([
          'getToken'
        ]),
        minHeight: () => {
          return (document.body.clientHeight >= 400 && document.body.clientHeight <= 736) ? document.body.clientHeight : window.screen.height
        }
      }
    }
</script>


<style>
    *{margin: 0; padding: 0;border: 0}
</style>