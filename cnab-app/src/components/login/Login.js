import { LoginButton } from "./LoginButton"
import AuthService from "../../services/AuthService"
const service = new AuthService();

const clickHandler = async (e) => {
    e.preventDefault();
    await service.login();
}

export const Login = (props) => {
    return (
        <div className="login-container">
            <div>
                <h2>Welcome to CNAB Dashboard</h2>
            </div>
            <div className="login-button">
                <LoginButton onClickHandler={clickHandler} platform="Github" class="dark rounded medium-font" />
            </div>
        </div>
    )
}