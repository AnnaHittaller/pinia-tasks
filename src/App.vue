<template>
  <main>

    <!-- heading -->
    <header>
      <div>

        <img src="./assets/pinia.svg" alt="Pinia logo">
        <h1>Pinia Tasks</h1>
      </div>
      <!-- new task form -->
      <div class="new-task-form">
        <TaskForm />
      </div>
    </header>


    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="taskStore.isLoading">
      <p>Loading tasks...</p>
    </div>

    <!-- tasklist -->

    <div class="task-list" v-if="filter === 'all'">
      <p>You have <span>{{ taskStore.totalCount }}</span> {{ totalCount > 1 ? "tasks" : "task" }} left to do:
      </p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have <span>{{ favCount }}</span> favorite {{ taskStore.favCount > 1 ? "tasks" : "task" }} left to
        do:</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- <button @click="taskStore.$reset">reset state</button> -->

  </main>
</template>

<script >
import { ref } from "vue"
import TaskDetails from "./components/TaskDetails.vue"
import TaskForm from "./components/TaskForm.vue"
import { useTaskStore } from "./stores/TaskStore"
import { storeToRefs } from "pinia"
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore()

    const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)
    // desctructuring state props and getters so we can use them in the template without STORENAME.whatever prefix, but actions DO NOT work this way

    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore, filter, tasks, isLoading, favs, totalCount, favCount }
  }
}
</script>


