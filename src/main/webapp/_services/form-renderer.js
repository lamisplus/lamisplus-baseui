import { url } from "../api";
import axios from "axios";

export async function fetchLastEncounter(patientId, formCode){
    return await axios.get(`${url}patients/${patientId}/encounters/${formCode}`, {})
        .then(response => {
            return response.data.length > 0 ? response.data[0]: null
        });
}