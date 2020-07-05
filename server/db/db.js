const sha1 = require('sha1')
const axios = require('axios')

// 线上数据库命名空间
const className = 'todo'

const createError = (code, res) => {
  const err = new Error(res.message)
  err.code = code
  return err
}

const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

const request = axios.create({
	baseURL: 'https://d.apicloud.com/mcm/api'
})

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    }, 
    async addTodo (todo) {
      return handleRequest(await request.post(`/${className}`, todo, {
        headers: getHeaders()
      }))
    }, 
    async updateTodo (id, todo) {
      return handleRequest(await request.put(`/${className}/${id}`, todo, {
        headers: getHeaders()
      }))
    }, 
    async deleteTodo (id) {
      return handleRequest(await request.delete(`/${className}/${id}`, {
        headers: getHeaders()
      }))
    }, 
    async deleteCompleted (ids) {
    	console.log(ids)
    	ids = typeof ids === 'string' ? JSON.parse(ids) : ids
    	const requests = ids.map(id => {
    		return {
    			method: 'delete',
    			path: `/mcm/api/${className}/${id}`
    		}
    	})
      return handleRequest(await request.post('/batch', { requests }, {
        headers: getHeaders()
      }))
    }
	}
}

