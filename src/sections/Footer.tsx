import React from "react"
import { MdOutlinePowerSettingsNew } from "react-icons/md"
import {signOut} from "firebase/auth";
import {firebaseAuth} from "../utils/FirebaseConfig";
import {useAppDispatch} from "../app/hooks";
import {setToast, setUserStatus} from "../app/slices/AppSlice";

function Footer() {
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        signOut(firebaseAuth);
        dispatch(setUserStatus(undefined));
        dispatch(setToast("登出股伴"));
    }

    return <footer>
        <div className="block">
            {/* <MdOutlinePowerSettingsNew /> */}
        </div>
        <div className="data"></div>
        <div className="block">
            <MdOutlinePowerSettingsNew onClick={handleLogOut}/>
        </div>

    </footer>;
}

export default Footer