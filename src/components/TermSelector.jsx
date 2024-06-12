import TermButton from "./TermButton";
import { terms } from "../utils/times";
import { signInWithGoogle, signOut } from "../utils/firebase";
import { useUserState } from "../utils/firebase";


const SignInButton = () => (
  <button className="btn btn-secondary btn-m"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const TermSelector = ({term, setTerm}) => {

  const user = useUserState();
  const isLoggedIn = user['0']?.uid
 // const {isUnsubscribed} = user
  console.log("term -user", user)
  //console.log("u sub", Object.entries(user))
  

  return(
  <div className="btn-toolbar justify-content-between">
    <div className="btn-group">
    { 
      Object.values(terms).map(
        value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
      )
    }
    </div>
    { isLoggedIn ? <SignOutButton /> : <SignInButton /> }
  </div>
)
};
export default TermSelector;