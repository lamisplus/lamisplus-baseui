import axios from "axios";
import {url} from "../../../axios/url"

const baseUrl = url;



export default {

    patient(urlendpint = baseUrl + 'visits/') {
        
        return {
            fetchAll: () => axios.get(urlendpint),
            fetchById: id => axios.get(urlendpint + id),
            create: newRecord => axios.post(urlendpint, newRecord),
            update: (id, updateRecord) => axios.put(urlendpint + id, updateRecord),
            delete: id => axios.delete(urlendpint + id)
        }
    }
}