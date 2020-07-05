import Axios from 'axios'
import { createError } from './util'

const baseURL = process.env.NODE_ENV === 'production' ? 'http://localhost:3333/' : '/'
const request = Axios.create({
	baseURL: baseURL
})

const handleRequest = (request) => {
	return new Promise((resolve, reject) => {
		request
		.then(res => {
			const data = res.data
			console.log(!data, !data.success, data.data)
			// console.log('handlerequest')
			if (!data) {
				return reject(createError(400, 'no data'))
			}
			if (!data.success) {
				return reject(createError(400, data.message))
			}
			resolve(data.data)
		})
		.catch(err => {
			console.log(err.response)
			if (err.response.status === 401) {
				reject(createError(401, 'need auth'))
			}
		})
	})
} 
export default {
	getAllTodos () {
		return handleRequest(request.get('/api/todos'))
	},
	login (username, password) {
    	return handleRequest(request.post('/user/login', { username, password }))
  	},
	updateTodo (id, todo) {
    	return handleRequest(request.put(`/api/todo/${id}`, todo))
  	},
	createTodo (todo) {
    	return handleRequest(request.post('/api/todo', todo))
  	},
	deleteTodo (id) {
    	return handleRequest(request.delete(`/api/todo/${id}`))
  	},
	deleteAllCompleted (ids) {
    	return handleRequest(request.post('/api/delete/completed', { ids }))
  	}
}
