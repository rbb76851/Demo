<template>
  <div class="content">
    <header class="flex-center">
      <img src="../assets/img/label_main.png" alt="note log">
      <h1> {{ state.title }} </h1>
    </header>
    <form class="flex-center"
          @submit.prevent="addEvent">
      <input class="border-none"
             type="text"
             :placeholder="state.msg"
             v-model="state.newEvent"/>
      <button class="submit-btn" type="submit">
        <ion-icon name="bookmarks-outline"></ion-icon>
      </button>
    </form>
    <div>
      <div class="flex-center mh-6">
        <h2>
          {{ state.subTitle1 }}
          <ion-icon name="close-circle-outline"/>
        </h2>
      </div>
      <div class="scroll pd-1 mh-50 border-gray bw-2">
        <ul v-for="(todoEvent, index) in state.todoList" :key="todoEvent.id">
          <li class="number" :class="{'bg-white':todoEvent.isTodoEvent}">{{ index + 1 }}</li>
          <li class="text" :class="{'bg-white':todoEvent.isTodoEvent}">
            {{ todoEvent.content }}
            <div class="tool flex-center">
              <ion-icon name="refresh-outline"
                        class="m-1"
                        @click="updateEvent(index)"/>
              <ion-icon name="trash-outline"
                        id="trash"
                        class="m-1"
                        @click="deleteTodoEvent(index)"/>
              <ion-icon name="checkmark-done-outline"
                        id="check"
                        class="m-1"
                        @click="moveEvent(index)"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex-center pt-1 mh-6">
        <h2>
          {{ state.subTitle2 }}
          <ion-icon name="checkmark-circle-outline"/>
        </h2>
      </div>
      <div class="scroll  mh-50">
        <ul v-for="(doneEvent, index) in state.compList" :key="doneEvent.id">
          <li class="number" :class="{'bg-green':doneEvent.isCompEvent}">{{ index + 1 }}</li>
          <li class="text" :class="{'bg-green':doneEvent.isCompEvent}">
            {{ doneEvent.content }}
            <div class="tool flex-center">
              <ion-icon name="trash-outline"
                        id="trash"
                        class="m-1"
                        @click="deleteCompEvent(index)"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="msg">
      <div class="flex-around">
        <p>
          <ion-icon name="wallet-outline"></ion-icon>
          所有事件: {{ state.total }}
        </p>
        <p>
          <ion-icon name="extension-puzzle-outline"></ion-icon>
          已完成事件: {{ state.compList.length }}
        </p>
        <p>
          <ion-icon name="cloud-done-outline"></ion-icon>
          未完成事件: {{ state.todoList.length }}
        </p>
        <p>
          <ion-icon name="analytics-outline"></ion-icon>
          进度: {{ process() }}%
        </p>
      </div>
      <div>
        <p>
          <ion-icon name="pencil-outline"></ion-icon>
          最近一次添加: {{ state.latestTime }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, defineExpose} from 'vue'

const state = reactive({
  title: "事 件 碎 片",
  subTitle1: "未完成",
  subTitle2: "已完成",
  msg: "✎ 这里输入今天要做的事情哦",
  newEvent: "",
  compList: [],
  todoList: [],
  total: 0,
  latestTime: '',
})

const getDate = () => {
  const date = new Date()
  const dateArr = []
  dateArr.push(date.getFullYear() + '年', date.getMonth() + 1 + '月', date.getDate() + '日', date.toString().slice(16, 24))
  return dateArr.join('')
}

const addEvent = () => {
  if (state.newEvent) {
    state.todoList.push({
      id: Date.now(),
      content: state.newEvent,
      isTodoEvent: true,
    })
    state.newEvent = ""
    state.total++
    state.latestTime = getDate()
  }
}

const updateEvent = (index) => {
}

const deleteCompEvent = (index) => {
  state.compList.splice(index, 1)
  state.total--
}
const deleteTodoEvent = (index) => {
  state.todoList.splice(index, 1)
  state.total--
}

const moveEvent = (index) => {
  state.compList.push({
    id: Date.now(),
    content: state.todoList[index].content,
    isCompEvent: true
  })
  state.todoList.splice(index, 1)
}

const process = () => {
  const totalEvents = state.compList.length + state.todoList.length
  if (totalEvents === 0) {
    return '0.00'
  }
  return ((state.compList.length / totalEvents) * 100).toFixed(2)
}

defineExpose({
  state,
})
</script>

<style lang="scss" scoped>
@import "../assets/style/index";

.tool {
  ion-icon:hover {
    transition: 0.3s;
    transform: scale(1.2) translateY(2px);
  }

  #trash {
    color: rgb(216, 0, 0);
  }

  #check {
    color: rgb(1, 165, 1);
    transform: scale(1.2);
  }
}

.content {
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
}

.submit-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  border-style: none;
  background-color: rgba(31, 41, 55, 1);
  color: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 2px #505050;
}

.submit-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 4px 4px 3px #5e5e5ee6;
  border: 1px solid gray;
}

.number {
  padding: 0.25rem 0.75rem 0.25rem 0.75rem;
  max-width: 10%;
  margin-right: 0.25rem;
}

.text {
  padding: 0.25rem 0.75rem 0.25rem 0.75rem;
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.msg {
  background: rgba(94, 94, 94, 0.1);
  height: 6.5rem;
  display: grid;
  border-width: 1px;
  border-style: dotted;
  border-radius: 0.75rem;
  border-color: rgba(75, 85, 99, 1);
}

</style>
