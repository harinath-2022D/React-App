import React, { useRef, useState } from "react";

const PasswordValidation = () => {
const password = useRef('')

  const [errors, setErrors] = useState([
    { minLength: false },
    { minNum: false },
    { capitalLetter: false },
    { specialChar: false },
  ]);

  const validatePassword = (pass) => {
    let errorsArr = [];
    console.log(pass)
    pass.length >= 8 ? (errorsArr[0] = true) : (errorsArr[0] = false);
    /\d/.test(pass) ? (errorsArr[1] = true) : (errorsArr[1] = false);
    /[A-Z]/.test(pass) ? (errorsArr[2] = true) : (errorsArr[2] = false);
    /[^A-Za-z0-9]/.test(pass) ? (errorsArr[3] = true) : (errorsArr[3] = false);

    setErrors([
    //   ...errors,
      { minLength: errorsArr[0] },
      { minNum: errorsArr[1] },
      { capitalLetter: errorsArr[2] },
      { specialChar: errorsArr[3] },
    ]);
  };

  function makeSingleErrorSet(){
    const set = new Set();
    errors.map((obj) => {
        for(let key in obj){
            if(obj[key] === false)
            set.add(key)
        }
    })
    return Array.from(set);
  }

  let actualErrors = makeSingleErrorSet();

  return (
    <>
      <p>Password</p>
      <input type="text" ref={password} onChange={() => validatePassword(password.current.value)} />
      
      {actualErrors.map( (val) => {
        if(val === 'minLength'){
            return <p style={{color: "red"}}>* minimum length should be 8 characters</p>
        }else if(val === 'minNum'){
            return <p style={{color: "red"}}>* at least one number required</p>
        }else if(val === 'capitalLetter'){
            return <p style={{color: "red"}}>* at least one capital letter required</p>
        }else{
            return <p style={{color: "red"}}>* at least one special character required</p>
        }
      })}
    </>
  );
};

export default PasswordValidation;
