import axios from "axios";

const Url = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(Url)
    return request.then(response => response.data)
}

const create = (obj) => {
    const request = axios.post(Url, obj)
    return request.then(response => response.data)
}

export default {
    getAll, create
}