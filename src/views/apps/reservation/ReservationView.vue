<template>
  <transition :name="transition">
    <router-view></router-view>
  </transition>
</template>

<script>
import store from '@/store';

export default {
  name: 'ReservationView',
  data(){
    return{
      //
    }
  },
  methods: {
    //
  },
  computed: {
    transition(){
      return store.state.appConfig.layout.routerTransition
    }
  },
  beforeCreate() {
    store.commit('appConfig/UPDATE_LAYOUT_TYPE', 'vertical')
  },
  created(){
    //
  },
  mounted(){},
}
</script>

<style>

</style>
