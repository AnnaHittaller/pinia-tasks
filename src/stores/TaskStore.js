import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [
			{ id: 1, title: "buy milk", isFav: false },
			{ id: 2, title: "play DnD", isFav: true },
		],
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
