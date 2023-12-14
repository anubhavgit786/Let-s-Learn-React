import { createContext, useContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "./fakeAuthActions";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

const reducer = (state, action)=>
{
    switch (action.type)
    {
        case LOGIN:
            return { ...state, isAuthenticated: true, user: action.payload };
        case LOGOUT:
            return { ...state, isAuthenticated: false, user: null } ;
        default:
            throw new Error("Unknown action type: " + action.type);
    }
}

const AuthProvider = ({ children })=>
{
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, isAuthenticated } = state;

    const login = (email, password)=>
    {
        if(email === FAKE_USER.email && password === FAKE_USER.password)
        {
            dispatch({ type: LOGIN, payload: FAKE_USER });
        }
    }
    
    const logout = ()=>
    {
        dispatch({ type: LOGOUT });
    }

    return (<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>)
}

const useAuth = ()=>
{
  const context = useContext(AuthContext);
  if(context === undefined)
  {
    throw new Error("AuthContext is used outside of the AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };