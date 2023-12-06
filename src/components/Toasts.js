import { useStore } from "../store";
import { Toast } from "react-bootstrap";
import '../assets/css/Toasts.css';
import {BsCheckCircle} from 'react-icons/bs'
import {AiOutlineCloseCircle} from 'react-icons/ai'

function Toasts() {
    //const [state, dispatch, toast, showToast] = useStore();
    const { toast } = useStore();
    return (
        <div>
            {toast && (
                <Toast className={`${toast.type}`}                   
                >
                    <Toast.Body>
                        {toast.type === 'success' ? 
                            (<BsCheckCircle className="icon" />) : 
                            (<AiOutlineCloseCircle className="icon" />)
                        }
                        {toast.message}
                    </Toast.Body>
                </Toast>
            )}
        </div>
    )
};

export default Toasts;