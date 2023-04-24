// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEmailConfirmQuery } from "../providers/redux/auth/authApi";
//
// export const ConfirmEmailPage = () => {
//   const handleConfirm = async () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const confirmParams = new URLSearchParams(location.search);
//     const confirmId = confirmParams.get("confirm");
//
//     try {
//       const { data, isLoading, isError, error } = await useEmailConfirmQuery(
//         confirmId
//       );
//       useEffect(() => {
//         if (error) {
//           const { data: message } = error;
//           console.log(message);
//           return <h1>{message}</h1>;
//         } else {
//           navigate("/login");
//         }
//       }, [data]);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   handleConfirm();
// };

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmailConfirmQuery } from "../providers/redux/auth/authApi";

export const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const confirmParams = new URLSearchParams(location.search);
  const confirmId = confirmParams.get("confirm");

  const { data, isLoading, isError, error } = useEmailConfirmQuery(confirmId);

  useEffect(() => {
    if (isError) {
      console.log(error.data);
      setMessage(error.data.message.toUpperCase());
    } else if (!isLoading && data) {
      console.log(data);
      setEmail(data.email);
      setTimeout(() => navigate("/login"), 5000);
    }
  }, [data, isLoading, isError, error]);

  return (
    <>
      {isError ? (
        <h1>{message}</h1>
      ) : (
        <h1>Email {email} successful confirmed!</h1>
      )}
    </>
  );
};
