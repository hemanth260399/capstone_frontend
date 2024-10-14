/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export let Componenttopmenu = ({ position, location, tabname, arrayoflist, loactionoflist }) => {
    return (
        <>
            {
                position === "single" ?
                    <div className="navbar-nav">
                        <div className="nav-item">
                            <Link to={location} className="nav-link custom-hover">{tabname}</Link>
                        </div>
                    </div> :
                    <div className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle custom-hover"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {tabname}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {arrayoflist.map((item, index) => (
                                <li key={index}>
                                    <Link to={loactionoflist[index]} className="dropdown-item custom-hover">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
            }
        </>
    )
}