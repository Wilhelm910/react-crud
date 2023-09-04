import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ContactService } from "../services/ContactService";

export default function AddContact() {


    let navigate = useNavigate()

    const [state, setState] = useState({
        loading: false,
        contact: {
            name: "",
            email: "",
            mobile: "",
            company: "",
            title: "",
            image: "",
            groupId: ""
        },
        errorMessage: ""
    })

    const [groupState, setGroupState] = useState({
        gLoading: false,
        groups: {},
        gErrorMessage: ""
    })


    function updateInput(event) {

        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }


    function handleInput(event) {
        event.preventDefault()

        async function handleData() {
            try {
                let response = await ContactService.createContact(state.contact)
                if (response) {
                    navigate("/", { replace: true })
                }
            } catch (error) {
                setState({
                    ...state,
                    errorMessage: error.message
                })
                console.log(error.message)
                navigate("/addContact", { replace: true })
            }
        }
        handleData()

    }




    useEffect(() => {
        async function fetchData() {
            try {
                setGroupState({
                    ...groupState,
                    gLoading: true
                })
                let response = await ContactService.getGroups()
                setGroupState({
                    ...groupState,
                    gLoading: true,
                    groups: response.data
                })
                console.log(response.data)
            }
            catch (error) {
                setGroupState({
                    ...groupState,
                    gLoading: true,
                    gErrorMessage: error.message
                })
                console.log(error.message)
            }
        }

        fetchData()
    }, [])

    let { gLoading, groups, gErrorMessage } = groupState
    console.log(groups)

    const renderGroupOptions = groups.length > 0 ? groups.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    }) : null


    let { loading, contact, errorMessage } = state

    return (
        <>
            <pre>{JSON.stringify(state.contact)}</pre>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Create Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Praesentium vero, similique autem minus at non enim deleniti dicta fugiat incidunt aliquam atque unde consequatur quo id nesciunt dolores inventore ducimus.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleInput}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text"
                                        placeholder="name"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="email"
                                        placeholder="email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
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
                                        onChange={updateInput}
                                        type="text"
                                        placeholder="title"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="image"
                                        value={contact.image}
                                        onChange={updateInput}
                                        type="text"
                                        placeholder="image"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
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
                                        onChange={updateInput}>

                                        <option value="">Select a group</option>
                                        {renderGroupOptions}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <button type="submit" className="btn btn-success">Create</button>
                                    <NavLink to="/" className="btn btn-dark ms-2">Cancle</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}