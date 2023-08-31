import { NavLink } from "react-router-dom";
import logo from "../images/fox.png"

export default function EditContacts() {
    return (
        <>
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
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <button type="submit" className="btn btn-success">Update</button>
                                    <NavLink to="/" className="btn btn-primary ms-2">Cancle</NavLink>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img className="contact-img" src={logo}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}