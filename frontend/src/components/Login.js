import React,{useEffect} from "react";
import "../styles/Login.css";

const Login = ({ setCurrentComponent, setUser, socket, setPlayers }) => {

useEffect(() => {
		const userIdFromLS = localStorage.getItem("token");
		if (userIdFromLS) {
			socket.emit("retriveUser", userIdFromLS);
			console.log("user token exists at frontend");
			//backend does not recognize the token
			socket.on("tokenError", (data) => {
				setCurrentComponent("Login");
				localStorage.removeItem("token");
				console.log(data);
				return;
			});
      socket.on("retrievdUser", (data) => {
        console.log("found your previous session");
        console.log("need to set back game on this socket: " + data.setGameOnSocket)
        setUser(data.user);
        if (data.inGame) {
          setCurrentComponent("UserBusy")
        }
        else {
          setPlayers(data.allOnlineUsers.filter((user) => { return (user.token != localStorage.getItem("token")) }));
          setCurrentComponent("Players");
        }
      });
      
      
		} else setCurrentComponent("Login");
	}, []);


  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    socket.emit("username", name);
    socket.on("usernameError", (data) => { console.log(data);return;});
    socket.on("usernameRegistered", (data) => {
      console.log("got back user token: " +data.token)
      const user = data.user;
      localStorage.setItem("token", data.token)
      setUser(user);
      setPlayers(data.allOnlineUsers.filter(u => { return (u.token != localStorage.getItem("token"))}))
      setCurrentComponent("Players");
    });

    e.target.reset();
  };
  return (
    <div className="login__wrapper">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Login;
