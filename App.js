import React, { useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import Main from "./screens/Main";
import { NativeBaseProvider } from "native-base";

export default function ImagePickerExample() {
  useEffect(() => {
    const askPermission = async () => {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted" || status === "denied") {
        alert("h");
      }
    };
    askPermission();
  }, []);
  return (
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
  );
}
