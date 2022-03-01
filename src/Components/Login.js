import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import db from "./firebase";

export const Login = () => {
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "userAuth", "Nc6YwaRH31HID5j8VcaM");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getData();
  }, []);

  return (
    <div>
      <form>
        <div className="fieldset">
          <input type="text" placeholder="Enter your name.." />
        </div>
      </form>
    </div>
  );
};
