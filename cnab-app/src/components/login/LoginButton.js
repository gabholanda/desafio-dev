export const LoginButton = (props) => {
    return (
        <button className={props.class} onClick={props.onClickHandler} type="button">Log In with {props.platform}</button>
    )
}