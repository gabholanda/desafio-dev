import { LoginButton } from "./LoginButton"

export const Login = (props) => {
    return (
        <div className="login-container">
            <div>
                <h2>Welcome to CNAB Dashboard</h2>
            </div>
            <div className="login-button">
                <LoginButton onClickHandler={props.handler} platform="Github" class="dark rounded medium-font" />
            </div>
        </div>
    )
}