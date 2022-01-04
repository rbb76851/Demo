<template>
  <Child
      v-model:user-name="userInfo.name"
      :uid="userInfo.id"
      @update-uid="updateUid"
  />
</template>

<script lang="ts">
import {defineComponent, reactive, ref, provide, onBeforeUnmount} from 'vue'
import Child from '../components/Child.vue'
import bus from '../libs/bus.ts'
interface Member{
  id: number,
  name: string,
};

export default defineComponent({
  components: {
    Child
  },
  setup() {
    const sayHi = (msg: string = 'hello') => {
      console.log(msg)
    }
    bus.on('sayHi',sayHi)
    onBeforeUnmount(()=>{
      bus.off('sayHi',sayHi)
    })

    const msg = ref<string>('hello')
    provide('message', msg)

    const userInfo: Member = reactive({
      id: 1,
      name: 'Petter',
    })
    provide('userInfo', userInfo)

    setTimeout(() => {
      // 修改消息内容
      msg.value = 'Hi World!';

      // 修改用户名
      userInfo.name = 'Tom';
    }, 2000);

    const updateUid = (id: number) => {
      userInfo.id = id
    }

    return {
      userInfo, updateUid,
    }
  }
})
</script>

<style scoped>

</style>