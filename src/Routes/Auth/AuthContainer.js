import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET,LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";


export default () => {

    const [action, setAction] = useState("logIn");
    const username = useInput("");    
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");    
    const password = useInput("");

    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables:{email: email.value}
        }
    );

    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables:{
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });

    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables:{
            secret: password.value,
            email:email.value
        }
    });

    const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

    const onSubmit = async (e) =>{
        e.preventDefault();
        if( action === "logIn"){
            if(email.value !== ""){
                try{
                    const {data : {requestSecret}} = await requestSecretMutation();
                    if(!requestSecret){
                        toast.error("You don't have an account yet, create one");     
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("check your inbox for your login secret");
                        setAction("confirm")
                    }
                } catch{
                    toast.error("Can't request Secret, try again");
                }
                
            } else {
                toast.error("Email is required");
            }
        } else if (action === "signUp") {

            if(
                email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value   !== ""   
            )  {
                try{
                    const {data:{createAccount}} = await createAccountMutation();
                    if(!createAccount){
                        toast.error("createAccountMutation return false");
                    } else {
                        toast.success("createMutation return true!");
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                } catch (e){
                    toast.error(e.message);
                }
                
            } else {
                toast.error("All field are required.");
            }
        } else if ( action === "confirm") {
            if(password.value !== ""){
                try{
                    const {data:{confirmSecret:token}} = await confirmSecretMutation();                    
                    
                    if(token !== "" && token !== undefined){
                        toast.success("Confirm Secret");
                        localLogInMutation({
                            variables:{token}
                        })
                    } else {
                        toast.error("token is empty/undefiend");
                    }
                }catch {
                    toast.error("Can't confirm Secret");
                }
            }
        }

    }    
    
    return (<AuthPresenter 
        setAction={setAction}
        action={action}
        username={username}        
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        onSubmit={onSubmit}
    />);
};