module.exports = (user, token) => {
    return (
    `<div>
        <h1>Wallaclone Recover Password Process</h1>
        <h2>Hello, ${user.name} ${user.surname}</h2>
        <p>This is the process to recover your password:</p>
        <br />
        <p>Please, click on given link to reset your password:</p>
        <p>http://localhost:4000/api/users/resetpassword/${token}</p>
    </div>`);
}