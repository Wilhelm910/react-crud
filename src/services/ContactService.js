import axios from "axios";


export class ContactService {
    static serverURL = "http://localhost:9000"

    static getAllContacts() {
        let dataURL = `${this.serverURL}/contacts`
        return axios.get(dataURL)
    }

    static getContactById(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL)
    }

    static getGroup(groupId) {
        let dataURL = `${this.serverURL}/groups/${groupId}`
        return axios.get(dataURL)
    }

    static getGroups() {
        let dataURL = `${this.serverURL}/groups/`
        return axios.get(dataURL)
    }
}