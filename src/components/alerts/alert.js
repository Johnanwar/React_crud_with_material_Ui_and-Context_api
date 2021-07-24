import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export  const notify = () => toast.success("تم إضافه البيانات بنجاح");
export  const notifyUpdate = () => toast.info("تم نعديل البيانات بنجاح");
export  const notifyDelete = () => toast.warn("  تم حذف البيانات ");
export  const notifyErr = () => toast.error("لم يتم حغظ البيانات");

export function Alert() {
   
    return (
        <div>
        <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}

 
