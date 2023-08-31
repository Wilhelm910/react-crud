import { NavLink, useParams } from "react-router-dom";
import logo from "../images/fox.png"
import { useState, useEffect } from "react";
import { ContactService } from "../services/ContactService";
import Spinner from "./Spinner";

export default function ViewContacts() {

    const { contactId } = useParams()

    const [contact, setContact] = useState({
        loading: false,
        user: {},
        errorMessage: "",
        group: {}
    })

    useEffect(() => {
        async function fetchData() {
            try {
                setContact({
                    ...contact,
                    loading: true
                })
                let response = await ContactService.getContactById(contactId)
                let groupResponse = await ContactService.getGroup(response.data.groupId)
                console.log(response.data)
                setContact({
                    ...contact,
                    loading: false,
                    user: response.data,
                    group: groupResponse.data
                })
            }
            catch (error) {
                setContact({
                    ...contact,
                    loading: true,
                    errorMessage: error.message
                })
            }
        }
        fetchData()

    }, [contactId])

    let { loading, user, errorMessage, group } = contact

    return (
        <>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View contact</p>
                            <p className="fst-itaic">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Itaque facere repellat molestias voluptatum, unde, harum provident assumenda perspiciatis, quae earum consequuntur excepturi!
                                Distinctio labore eius veniam quod molestias, eos laudantium?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="view-contact mt-3">
                <div className="container">
                    {loading ? <Spinner /> :
                        (<div className="row">
                            <div className="col-md-4">
                                <img className="contact-img" src={logo} />
                            </div>
                            <div className="col-md-8">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-action">
                                        Name: <span className="fw-bold">{user.name}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Mobile: <span className="fw-bold">{user.mobile}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Email: <span className="fw-bold">{user.email}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Company: <span className="fw-bold">{user.company}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Title: <span className="fw-bold">{user.title}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-action">
                                        Group: <span className="fw-bold">{group.name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        )}
                    <div className="row">
                        <div className="col">
                            <NavLink to="/" className="btn btn-warning">Back</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}