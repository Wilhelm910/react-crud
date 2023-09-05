import { NavLink, useParams, useNavigate } from "react-router-dom";
import logo from "../images/fox.png"
import { useEffect, useState } from "react";
import { ContactService } from "../services/ContactService";
import Spinner from "./Spinner";

export default function EditContacts() {

    let params = useParams()

    let navigate = useNavigate()


    const [state, setState] = useState({
        contact: {
            name: "",
            email: "",
            mobile: "",
            title: "",
            company: "",
            image: "",
            groupId: ""
        },
        loading: false,
        errorMessage: "",
        groups: []
    })

    useEffect(() => {
        async function fetchData() {
            setState({
                ...state,
                loading: true
            })
            try {
                let response = await ContactService.getContactById(params.contactId)
                let groupResponse = await ContactService.getGroups()
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    groups: groupResponse.data
                })
            }
            catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.errorMessage
                })
            }
        }
        fetchData()
    }, [params.contactId])

    let { loading, contact, errorMessage, groups } = state

    let renderGroups = groups.length > 0 ? groups.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    }) : null

    function updateContact(event) {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }


    function submitForm(event) {
        event.preventDefault()

        async function handleData() {
            try {
                let response = await ContactService.updateContact(contact, params.contactId)
                if (response) {
                    navigate("/", { replace: true })
                }
            }
            catch (error) {
                setState({
                    ...state,
                    errorMessage: error.errorMessage
                })
                navigate(`/editContact/${params.contactId}`, { replace: true })
            }
        }
        handleData()
    }


    return (
        <>
            {
                loading ? <Spinner /> :
                    <>
                        <pre>{JSON.stringify(contact)}</pre>
                        <section className="add-contact p-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h4 text-primary fw-bold">Edit Contact</p>
                                        <p className="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            Praesentium vero, similique autem minus at non enim deleniti dicta fugiat incidunt aliquam atque unde consequatur quo id nesciunt dolores inventore ducimus.</p>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <form onSubmit={submitForm}>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name="name"
                                                    value={contact.name}
                                                    onChange={updateContact}
                                                    type="text"
                                                    placeholder="name"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="photo url"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name="mobile"
                                                    value={contact.mobile}
                                                    onChange={updateContact}
                                                    type="number"
                                                    placeholder="mobile"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name="title"
                                                    value={contact.title}
                                                    onChange={updateContact}
                                                    type="text"
                                                    placeholder="title"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name="email"
                                                    value={contact.email}
                                                    onChange={updateContact}
                                                    type="email"
                                                    placeholder="email"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name="company"
                                                    value={contact.company}
                                                    onChange={updateContact}
                                                    type="text"
                                                    placeholder="company"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <select className="form-control"
                                                    required={true}
                                                    name="groupId"
                                                    value={contact.groupId}
                                                    onChange={updateContact}
                                                >

                                                    {renderGroups}
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <button type="submit" className="btn btn-success">Update</button>
                                                <NavLink to="/" className="btn btn-primary ms-2">Cancle</NavLink>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-6">
                                        <img className="contact-img" src={logo} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
            }

        </>
    )
}