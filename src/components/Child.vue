<template>
  <p>用户id：{{ uid }}</p>
  <p>用户名：{{ userName }}</p>
  <p>信息：{{ msg }}</p>
  <p>{{ userInfo }}</p>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'
import bus from '../libs/bus.ts'

export default defineComponent({
  props: {
    userName: String,
    uid: [Number,String],
  },
  emits: [
    'update:userName',
    'update-uid'
  ],
  setup (props, { emit }) {
    bus.emit('sayHi','哈啰')
    const msg = inject('message');
    const userInfo = inject('userInfo');

    // 打印刚刚拿到的数据
    console.log(msg);
    console.log(userInfo);

    // 因为 2s 后数据会变，我们 3s 后再看下，可以争取拿到新的数据
    setTimeout(() => {
      console.log(msg);
      console.log(userInfo);
    }, 3000);
    // console.log(props)
    // 2s 后更新用户名
    // setTimeout(() => {
    //   emit('update:userName', 'Tom')
    // }, 2000);
    // setTimeout(() => {
    //   emit('update-uid', '17')
    // }, 2000);
    return{
      msg, userInfo
    };
  },

})

</script>

<style scoped>

</style>