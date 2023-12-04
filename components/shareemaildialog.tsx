import React, { useCallback, useMemo, useState } from "react";
import Input from "./input";
import { signJwtAccessToken, verifyJwtAccessToken } from "@/hooks/useJwtToken";
import { MdOutlineCopyAll } from "react-icons/md";
import axios from "axios";
import useSharedUrls from "@/hooks/useSharedUrls";
import useCurrentUser from "@/hooks/useCurrentUser";

interface EmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  shareMovieId: string;
  movieCost: number;
  userbalance: number;
}

const ShareEmailDialog: React.FC<EmailDialogProps> = ({
  isOpen,
  onClose,
  shareMovieId,
  movieCost,
  userbalance,
}) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [JwtToken, setJwtToken] = useState("");
  const [isJwtTokenSuccess, setIsJwtTokenSuccess] = useState<boolean | null>(
    null
  );
  const [isEmailEditable, setIsEmailEditable] = useState(true);
  const [isJwtTokenCopied, setIsJwtTokenCopied] = useState<boolean | null>(
    null
  );
  const [userMessage, setUserMessage] = useState("");
  if (userbalance === undefined) {
    userbalance = 0;
  }
  if (movieCost == undefined) {
    movieCost = 0;
  }
  const isUserBalancePositive: boolean = userbalance - movieCost > 0;
  const [isMovieAlreadyShared, setIsMovieAlreadyShared] = useState<
    boolean | null
  >(null);

  const validateEmail = (input: any) => {
    // Regular expression for a simple email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(input);
  };

  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleClose = () => {
    setEmail("");
    setIsJwtTokenSuccess(null);
    setIsJwtTokenCopied(null);
    setIsEmailEditable(true);
    setJwtToken("");
    setUserMessage("");
    onClose();
  };

  const handleCopyClick = () => {
    // Copy the JwtToken value to the clipboard
    navigator.clipboard
      .writeText(JwtToken)
      .then(() => {
        console.log("Token copied to clipboard");
        setUserMessage("Shared Url copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying to clipboard", error);
        setUserMessage("There is Error in Copying Please Shared Url Manually");
      });
  };

  const { mutate: mutateSharedAccessTokens } = useSharedUrls();
  const { data: currentUser, mutate } = useCurrentUser();

  const handleAddCredit =async () => {
      console.log(currentUser);
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          currentBalance: 10000,
        },
      });
  }


  const handleSubmit = async () => {
    setIsJwtTokenSuccess(null);

    if (email.length < 3) {
      console.log("Submitted Empty email:", email);
      onClose();
      return;
    }

    const tokenPayload = {
      movieId: shareMovieId,
      email: email,
    };

    setIsEmailEditable(false);
    const accessToken = signJwtAccessToken(tokenPayload);
    const decoded = verifyJwtAccessToken(accessToken!!);

    if (decoded && decoded.movieId === shareMovieId) {
      setJwtToken(`http://localhost:3000/watch/${accessToken}`);
      setIsJwtTokenSuccess(true);
    } else {
      setIsJwtTokenSuccess(false);
      setUserMessage(
        "Sorry, we couldn't share the movie. Please try again later."
      );
    }

    try {
      let response;

      response = await axios.post("/api/shareurl", { accessToken });
      const updatedAccessTokens = response?.data?.sharedAccessTokens;

      mutate({
        ...currentUser,
        sharedAccessTokens: updatedAccessTokens,
      });
      mutateSharedAccessTokens();

      if (response.status == 200) {
        setIsMovieAlreadyShared(false);
        setUserMessage("The shared URL is generated. Share and enjoy!");
        console.log(response.data);
        return;
      } 
      
      else if (response.status == 204) {
        setIsMovieAlreadyShared(true);
        setUserMessage(
          `This Movie is already shared With ${email} and No Money Deducted`
        );
        console.log(response.data);
        return;
      } else {
        setIsMovieAlreadyShared(null);
        console.log(response.data);
        return;
      }
    } catch (e) {
      setIsMovieAlreadyShared(null);
      console.log(e);
    }
  };

  return (
    <>
      {isUserBalancePositive === false && (
        <div className={`dialog ${isOpen ? "open" : ""}`}>
          <div className="dialog-content">
            <h2>
              You Dont have Sufficient Money to Buy , Sorry Please Add Credit
            </h2>
            <button
              onClick={handleClose}
              className="bg-slate-700 py-3 text-white rounded-md w-full mt-10 hover:bg-slate-950 transition"
            >
              Back
            </button>
           
          </div>
        </div>
      )}

      {isUserBalancePositive === true && (
        <div className={`dialog ${isOpen ? "open" : ""}`}>
          <div className="dialog-content">
            <h2>Enter Recipient email </h2>
            <Input
              id="share_button"
              type="email"
              label="Friend's Email"
              value={email}
              onChange={handleEmailChange}
              disabled={!isEmailEditable}
            />
            {!isValidEmail && (
              <div style={{ color: "red" }}>
                Please enter a valid email address.
              </div>
            )}
            <h2>Your Balance is: {userbalance.toString()}</h2>
            <h2>Movie Share Cost: {movieCost.toString()}</h2>
            <h2>
              Updated Balance After Transaction:{" "}
              {(userbalance - movieCost).toString()}
            </h2>
            <button
              onClick={handleSubmit}
              className={`bg-slate-700 py-3 text-white rounded-md w-full mt-10 hover:bg-slate-950 transition ${
                !isValidEmail ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isJwtTokenSuccess === true}
            >
              Submit
            </button>

            <button
              onClick={handleClose}
              className="bg-slate-700 py-3 text-white rounded-md w-full mt-10 hover:bg-slate-950 transition"
            >
              {isJwtTokenSuccess === true ? "Back" : "Cancel"}
            </button>

            {isJwtTokenSuccess == false && isValidEmail && (
              <div style={{ color: "red" }}> {userMessage} </div>
            )}
            {isJwtTokenSuccess == true && isValidEmail && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Input
                    id="accesstoken"
                    type="string"
                    label="Share URL"
                    value={JwtToken}
                    disabled={true}
                    onChange={null}
                  />
                  <MdOutlineCopyAll
                    onClick={handleCopyClick}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  ></MdOutlineCopyAll>
                  <div style={{ color: "green" }}>{userMessage} </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShareEmailDialog;
