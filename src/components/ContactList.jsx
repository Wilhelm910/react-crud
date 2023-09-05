import { NavLink } from "react-router-dom"
import logo from "../images/fox.png"
import { useEffect, useState } from "react"
import { ContactService } from "../services/ContactService"

import Spinner from "./Spinner"

export default function ContactList() {


    const [query, setQuery] = useState({
        text: ""
    })

    const [state, setState] = useState({
        loading: false,
        contacts: [],
        filtededContacts: [],
        errorMessage: ""
    })

    useEffect(() => {
        async function fetchData() {
            try {
                setState({
                    ...state,
                    loading: true
                })
                let response = await ContactService.getAllContacts()
                console.log(response.data)
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filtededContacts: response.data
                })
            }
            catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                })
                console.log(state.errorMessage)
            }
        }

        fetchData()
    }, [])

    let { loading, contacts, filtededContacts ,errorMessage } = state


    function clickDelete(id) {
        async function handleData() {
            try {
                let response = await ContactService.deleteContact(id)
                if (response) {
                    let response = await ContactService.getAllContacts()
                    console.log(response.data)
                    setState({
                        ...state,
                        loading: false,
                        contacts: response.data,
                        filtededContacts: response.data
                    })
                }
            } catch (error) {
                setState({
                    ...state,
                    errorMessage: error.message
                })
            }
        }
        handleData()
    }

    function searchContacts(event) {
        setQuery({
            ...query,
            text: event.target.value
        })
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setState({
            ...state,
            filtededContacts: theContacts
        })
    }


    const renderCards = filtededContacts.map((item) => {
        return (
        
            <div className="col-md-6" key={item.id}>
                <div className="card my-2">
                    <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                            <div className="col-md-4">
                                <img src={logo} className="contact-img" />
                            </div>
                            <div className="col-md-7">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-action">
                                        Name: <span className="fw-bold">{item.name}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Mobile: <span className="fw-bold">{item.mobile}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Email: <span className="fw-bold">{item.email}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-1 d-flex flex-column align-items-center">
                                <NavLink to={`/viewContact/${item.id}`} className="btn btn-warning my-1"><i className="fa fa-eye" /></NavLink>
                                <NavLink to={`/editContact/${item.id}`} className="btn btn-primary my-1"><i className="fa fa-pen" /></NavLink>
                                <button onClick={() => clickDelete(item.id)} className="btn btn-danger"><i className="fa fa-trash my-1" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <>
        <pre>{JSON.stringify(query)}</pre>
            <section className="contact-search p-3" >
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">
                                    Contact Manager
                                    <NavLink to="/addContact" className="btn btn-primary ms-2"> <i className="fa fa-plus-circle me-1" />New</NavLink>
                                </p>
                                <p className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    Recusandae nobis inventore quidem aliquam iure omnis nihil ad consequatur possimus distinctio vitae facere, voluptate at sed? Modi fugit facere tenetur eos.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form style={{ display: "flex" }}>
                                    <div className="mb-2">
                                        <input
                                            name="text"
                                            value={query.text}
                                            onChange={searchContacts}
                                            type="text"
                                            className="form-control"
                                            placeholder="Search contacts" />
                                    </div>
                                    <div className="mb-2">
                                        <button type="submit" className="btn btn-outline-dark">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> :
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {renderCards}
                            </div>
                        </div>
                    </section>
            }

        </>
    )
}