import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <>
      <h2> Log in </h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="Username"
            value={username}
            onChange={handleUsername}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="Password"
            value={password}
            onChange={handlePassword}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
