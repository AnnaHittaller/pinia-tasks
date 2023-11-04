import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [],
        isLoading: false
	}),
	getters: {
		favs() {
			return this.tasks.filter((t) => t.isFav);
		},
		favCount() {
			return this.favs.length;
		},
		totalCount: (state) => {
			//just to demostrate arrow function as getter; can not use "this" with arrow functions
			return state.tasks.length;
		},
	},
	actions: {
		async getTasks() {
            this.isLoading = true
			const res = await fetch("http://localhost:3000/tasks");
			const data = await res.json();
			this.tasks = data;
            this.isLoading = false
		},
		addTask(task) {
			this.tasks.push(task);
		},
		deleteTask(id) {
			this.tasks = this.tasks.filter((t) => t.id !== id);
		},
		toggleFav(id) {
			const task = this.tasks.find((t) => t.id === id);
			task.isFav = !task.isFav;
		},
	},
});
