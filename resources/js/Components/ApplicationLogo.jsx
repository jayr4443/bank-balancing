import logo from "../../../img/cash-management.png";

export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={logo}
            alt="Application Logo"
            style={{ width: "80px", height: "auto" }}
        />
    );
}
