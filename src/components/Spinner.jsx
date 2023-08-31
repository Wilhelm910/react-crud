import SpinnerImg from "../images/Loading_icon.gif"


export default function Spinner() {
    return (
        <img src={SpinnerImg} className="d-block m-auto" style={{width: "200px"}}/>
    )
}