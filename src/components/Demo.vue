<template>
  <ul class="user-info">
    <li class="item">
      <span class="key">ID:</span>
      <span class="value">{{ id }}</span>
    </li>
    <li class="item">
      <span class="key">name:</span>
      <span class="value" @click="changeName">{{ name }}</span>
    </li>
    <li class="item">
      <span class="key">age:</span>
      <span class="value">{{ age }}</span>
    </li>
    <li class="item">
      <span class="key">gender:</span>
      <span class="value">{{ gender }}</span>
    </li>
  </ul>
  <input type="text"
         v-model="tagsStr"
         placeholder="请输入标签，用逗号隔开"
         :class="{ 'active-class': isActive }"
  />
  <ul>
    <li v-for="tags in tagsStr">{{ tags }}</li>
  </ul>
  <ul>
    <li :class="{ cur:index === curIndex }"
        v-for="(item,index) in 5"
        :key="index"
        @click="curIndex = index">
      {{ item }}
    </li>
  </ul>
  <button class="link" @click="switchPage">路由跳转</button>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, reactive, onMounted, watch, computed, useAttrs} from 'vue'
import { useRouter } from 'vue-router'

interface Member {
  id: number,
  name: string,
  age: number,
  gender: string
};


export default defineComponent({
  setup() {

    const memberList = ref<Member[]>([
      {
        id:1,
        name: 'hr',
      },
      {
        id:2,
        name:'cyf'
      }
    ])
    const userInfo: Member[] = reactive({
      id: 1,
      name: 'Petter',
      age: 18,
      gender: 'male'
    })
    const changeName = () =>{
      userInfo.name = 'hr'
    }
    const userInfoRefs = toRefs(userInfo)
    setTimeout(() => {
      userInfo.id = 2
      userInfo.name = 'Tom'
      userInfo.age = 20
    }, 2000)

    const init = () =>{
      console.log('init')
    }

    // watch(userInfo, () => {
    //   console.log('监听整个 ref ', userInfo);
    // })
    // watch( () => userInfo.name, () => {
    //   console.log('只监听 name ', userInfo.name);
    // })
    //
    // watch( () => userInfo.name, (newVal, oldVal) => {
    //   console.log('打印改变前后的值', {newVal, oldVal});
    // })

    const nowTime = computed(()=>new Date())
    console.log(nowTime.value)
    setTimeout(()=>{
      console.log(nowTime.value)
    },2000)

    onMounted(() => {
      init()
    })
    const msg = ref<string>("hello")
    console.log(msg.value)

    // 响应性失效问题
    let uids: number[] = reactive([1,2,3])
    // uids = []
    uids.length = 0
    setTimeout(() => {
      uids.push(1)
      console.log((uids))
    },1000)

    // const firstName = ref<string>('Bill')
    // const lastName= ref<string>('Gates')
    // const fullName = computed({
    //   get(){
    //     return `${firstName.value} ${lastName.value}`
    //   },
    //   set(newFirstName: string){
    //     firstName.value = newFirstName
    //   }
    // })
    // console.log(fullName.value)
    // setTimeout(()=>{
    //   fullName.value = 'Petter'
    //   console.log(firstName.value)
    //   console.log(fullName.value)
    // },2000)

    const tags = ref<string[]>([])
    const tagsStr = computed({
      get(){
        return tags.value.join(',')
      },
      set(newValue:string){
        tags.value = newValue.split(',')
      }
    })
    const activeClass = 'active-class'
    const isActive = true
    const curIndex = ref<number>(0)
    const router: any = useRouter()
    const switchPage = () => {
      router.push({name: 'notePage'})
    }


    const attrs = useAttrs()
    console.log('attrs '+ attrs.class)


    return {
      ...userInfoRefs,changeName,
      tagsStr,
      activeClass,
      isActive,
      curIndex,
      switchPage
    }
  },


})
</script>

<style scoped>
.msg {
  font-size: 34px;
}
.active-class{
  border-color: cornflowerblue;
}
.cur{
  color: darkred;
}

</style>