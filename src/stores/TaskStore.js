import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [],
		isLoading: false,
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
			this.isLoading = true;
			const res = await fetch("http://localhost:3000/tasks");
			const data = await res.json();
			this.tasks = data;
			this.isLoading = false;
		},
		async addTask(task) {
			this.tasks.push(task);
			const res = await fetch("http://localhost:3000/tasks", {
				method: "POST",
				body: JSON.stringify(task),
				headers: { "Content-Type": "application/json" },
			});

			if (res.error) console.log(error);
		},
		async deleteTask(id) {
			this.tasks = this.tasks.filter((t) => t.id !== id);
			const res = await fetch("http://localhost:3000/tasks/" + id, {
				method: "DELETE",
			});

			if (res.error) console.log(error);
		},
		async toggleFav(id) {
			const task = this.tasks.find((t) => t.id === id);
			task.isFav = !task.isFav;
			const res = await fetch("http://localhost:3000/tasks/" + id, {
				method: "PATCH",
				body: JSON.stringify({ isFav: task.isFav }),
				headers: { "Content-Type": "application/json" },
			});

			if (res.error) console.log(error);
		},
	},
});
