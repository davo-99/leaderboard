"use strict";

const username = document.getElementById('username');
const score = document.getElementById('score');
const save = document.getElementById('save');
const updateBtn = document.getElementById('update');
const deleteBtn = document.getElementById('delete');

let arr = JSON.parse(localStorage.getItem('users')) || [];

const Users = (() => {

	/**
	 * @param {string} un - The user's username.
	 * @param {number} points - The user's score.
	 */
	
	const _check = (un, points) => un.value === "" && isNaN(un.value.charAt(0)) && points.value === ""? false: true;

	const CapsOff = un => un.value = un.value.toLowerCase();

	function createUser(un, points) {
		// atomatically creates a new local storage w/o having to refresh the page after clearing it
		if (!('users' in localStorage)) {
			arr = JSON.parse(localStorage.getItem('users')) || [];
			localStorage.setItem('users', JSON.stringify(arr));
			arr = JSON.parse(localStorage.getItem('users'));
		}

		for (const elem of arr)
			if (elem.username === un.value) {
				console.error('User already exists');
				return;
			}

		if (_check(un, points)) {
			
			class User {
			    constructor(name, score) {
				this.username = name;
				this.score = +score;
			    }
			}
			
			const user = new User(un.value, points.value);

			arr.push(user);
			console.log(`%cUser "${arr[arr.length-1].username}" has been added \u2714`, 'color: orange; font-size: 14px');
			arr.sort((a, b) => b.score - a.score);
			console.table(arr);
			localStorage.setItem('users', JSON.stringify(arr));
		} else console.warn('Invalid input');
	}

	function updateUser(un, points) {
		arr = JSON.parse(localStorage.getItem('users')) || [];

		if (_check(un, points)) {
			
			for (const elem of arr) {
				if (elem.username === un.value) {
					elem.score = +points.value;
					console.groupCollapsed(`${elem.username}'s previous stats`);
					console.log(`Score: ${elem.score}`);
					console.groupEnd(`${elem.username}`);
					console.log(`%c${elem.username}'s stats have been updated`, 'color: green; font-size: 14px');
					arr.sort((a, b) => b.score - a.score);
					console.table(arr);
					break;
				} else console.info(`User not found`);
			}
			localStorage.setItem('users', JSON.stringify(arr));
		} else console.warn('Invalid input');
	}

	function deleteUser(un) {
		arr = JSON.parse(localStorage.getItem('users')) || [];

		if (un.value !== "" && isNaN(un.value.charAt(0))) {

			for (const [index, elem] of arr.entries()) {
				if (elem.username === un.value) {
					console.log(`%c${elem.username} no more exists`, 'color: blue; font-size: 14px');
					arr.splice(index, 1);
					console.table(arr);
					break;
				} else console.info(`User doesn't exist`);
			}
			localStorage.setItem('users', JSON.stringify(arr));
		} else console.warn('Invalid input');
	}

	return {
		CapsOff,
		createUser,
		updateUser,
		deleteUser
	}
})();

username.addEventListener('blur', () => Users.CapsOff(username));
save.addEventListener('click', () => Users.createUser(username, score));
updateBtn.addEventListener('click', () => Users.updateUser(username, score));
deleteBtn.addEventListener('click', () => Users.deleteUser(username));
