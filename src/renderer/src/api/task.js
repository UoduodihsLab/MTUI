import api from './http'

export default {
    listTask: function () {
        return api.get('/tasks')
    },
    createTask: function (data) {
        return api.post('/tasks', data)
    },

    startTask: function (taskID) {
        return api.post(`/tasks/start/${taskID}`)
    }
}
