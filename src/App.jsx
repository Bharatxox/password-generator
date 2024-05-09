import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setlength] = useState(8);
  const [upper, setupper] = useState(false);
  const [lower, setlower] = useState(false);
  const [symbol, setsymbol] = useState(false);
  const [number, setnumber] = useState(false);
  const [input, setinput] = useState("");

  const toggleUpper = () => {
    setupper(!upper);
  };

  const toggleLower = () => {
    setlower(!lower);
  };

  const toggleNumber = () => {
    setnumber(!number);
  };

  const toggleSymbol = () => {
    setsymbol(!symbol);
  };

  useEffect(() => {
    setinput("");
  }, [upper, lower, symbol, number]);

  const handleNumChange = (e) => {
    let no = e.target.value;
    setlength(no);
  };

  const genartePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()-_=+";
    const numberChars = "0123456789";

    let char = "";
    if (upper) char += uppercaseChars;
    if (lower) char += lowercaseChars;
    if (symbol) char += symbolChars;
    if (number) char += numberChars;
    if (char === "") {
      toast.warning("plz select atleat one option", {
        position: "top-center",
        theme: "dark",
      });
    }

    if (length < 8 || length > 50) {
      toast.error("Plz fill the invalid input data", {
        position: "top-center",
        theme: "dark",
      });
      // alert("Password length should be between 8 and 50 characters.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += char.charAt(Math.floor(Math.random() * char.length));
    }
    setinput(newPassword);
  };

  const copyPassword = () => {
    navigator.clipboard
      .writeText(input)
      .then(() => {
        if (input === "") return;
        toast.success("Password is copied", {
          position: "top-center",
          theme: "dark",
        });
      })
      .catch((error) => console.error("Unable to copy password:", error));
  };

  return (
    <section className="w-screen relative flex justify-center items-center h-screen font-Poppins">
      <div className=" p-1  rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="flex flex-col gap-5  bg-gray-800 back rounded-md p-10">
          <div className="w-full ">
            <h1 className="font-bold capitalize">Password generator</h1>
          </div>
          <div className="flex justify-center gap-3 w-full">
            <input
              className="rounded-md w-5/6 p-2"
              type="text"
              disabled
              value={input}
            ></input>
            <button onClick={copyPassword}>copy</button>
          </div>
          <div className="flex w-full justify-between gap-5 items-center">
            <p className="text font-semibold">
              Select password length (**8-50 characters**)
            </p>
            <input
              className=" max-w-[70px] p-2 rounded-md "
              type="number"
              value={length}
              onChange={(e) => handleNumChange(e)}
            />
          </div>
          <div className="flex flex-col w-full font-medium">
            <div className="flex gap-3">
              <input type="checkbox" onChange={toggleUpper} />
              <label>Include upper case</label>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" onChange={toggleLower} />
              <label>Include lpper case</label>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" onChange={toggleNumber} />
              <label>Include numbers</label>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" onChange={toggleSymbol} />
              <label>Include symbols</label>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="py-3" onClick={genartePassword}>
              Genrate Password
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default App;
