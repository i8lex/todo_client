import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEmailConfirmQuery } from "../providers/redux/auth/authApi";

export const ConfirmEmailPage = () => {
  const handleConfirm = async () => {
    const location = useLocation();
    const confirmParams = new URLSearchParams(location.search);
    const confirmId = confirmParams.get("confirm");

    try {
      const { data, isLoading, isError, error } = await useEmailConfirmQuery(
        confirmId
      );
      console.log(data);
      console.log(isError);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  handleConfirm();
};
