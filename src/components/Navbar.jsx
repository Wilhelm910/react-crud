import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <NavLink to="/" className="navbar-brand"><i className="fa fa-mobile text-warning"/> <span className="ms-2">Contact</span> <span className="text-warning">Manager</span></NavLink>
                </div>
            </nav>
        </>
    )
}