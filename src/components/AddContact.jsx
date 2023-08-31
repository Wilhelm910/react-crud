import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ContactService } from "../services/ContactService";

export default function AddContact() {

    const [state, setState] = useState({
        loading: false,
        contact: {

        }
    })

    const [groupState, setGroupState] = useState({
        loading: false,
        groups: {},
        errorMessage: ""
    })

    useEffect(() => {
        async function fetchData() {
            try {
                setGroupState({
                    ...groupState,
                    loading: true
                })
                let response = await ContactService.getGroups()
                setGroupState({
                    ...groupState,
                    loading: true,
                    groups: response.data
                })
            }
            catch (error) {
                setGroupState({
                    ...groupState,
                    loading: true,
                    errorMessage: error.message
                })
            }
        }

        fetchData()
    }, [])

    let { loading, groups, errorMessage } = groupState
    console.log(groupState.groups)

    const renderGroupOptions = groups.map((item) => {
        return (
            <option value={item.id}>{item.name}</option>
        )
    })

    return (
        <>
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
                            <form>
                                <div className="mb-2">
                                    <input
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
                                        type="number"
                                        placeholder="mobile"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        placeholder="title"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="email"
                                        placeholder="email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        placeholder="company"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <select className="form-control">
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