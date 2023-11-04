<template>
  <main>

    <!-- heading -->
    <header>
      <img src="./assets/pinia.svg" alt="Pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- tasklist -->

    <div class="task-list" v-if="filter === 'all'">
      <p>You have <span>{{ taskStore.totalCount }}</span> {{ taskStore.totalCount > 1 ? "tasks" : "task" }} left to do:</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have <span>{{ taskStore.favCount }}</span> favorite {{ taskStore.favCount > 1 ? "tasks" : "task" }} left to
        do:</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script >
import { ref } from "vue"
import TaskDetails from "./components/TaskDetails.vue"
import TaskForm from "./components/TaskForm.vue"
import { useTaskStore } from "./stores/TaskStore"
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore()

    const filter = ref('all')

    return { taskStore, filter }
  }
}
</script>


