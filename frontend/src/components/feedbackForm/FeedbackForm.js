import React,{ useState } from 'react';
import Card from '../ui/card/card';

function FeedbackForm(props) {

    const [userDetail,setUserDetail] = useState("");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");

    const submitBtnClick = () =>{
        fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSeGhRaE1wbT7YkIEJ3qes0rzrPy254OY4piucaZTj8skxy7GQ/formResponse", {
            "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            },
            "referrer": "https://docs.google.com/forms/d/e/1FAIpQLSeGhRaE1wbT7YkIEJ3qes0rzrPy254OY4piucaZTj8skxy7GQ/viewform?fbzx=6031848661351576410",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "entry.1113368786="+userDetail+"&entry.206442637="+subject+"&entry.1599217455="+message+"&fvv=1&draftResponse=%5Bnull%2Cnull%2C%226031848661351576410%22%5D%0D%0A&pageHistory=0&fbzx=6031848661351576410",
            "method": "POST",
            "mode": "no-cors",
            "credentials": "include"
        });
        alert("Complaint registered succesfully");
    }

        return (
        <div className="row mr-0 ml-0 justify-content-center">
        <div className="col-12 px-5 py-3" >
            <h2>Feedback/Complaint Form</h2>
            <hr/>
        </div>
        <div className="col-10 text-center">
        <Card title="Register Your Complaint Here!!" variant="green" >
            <form>
                <label style={{padding: 25, width:"250px", fontWeight:"bold"}}>Your Email/Mobile No. </label>
                <input type="text"
                placeholder="Type your Email/Mobile No."
                value={userDetail}
                className="border"
                style={{width:"500px", height: "40px", padding:5}}
                onChange={text=> setUserDetail( text.target.value )}
                />
                <br />
                <label style={{padding: 25, width:"250px", fontWeight:"bold"}}>Subject/Title </label>
                <input type="text"
                placeholder="Subject/Title for Complaint"
                className="border"
                style={{width:"500px", height: "40px", padding:5}}
                value={subject}
                onChange={text=> setSubject( text.target.value )}
                />
                <br />
                <label style={{padding: 25, width:"250px", fontWeight:"bold"}}>Complaint/Feedback </label>
                <textarea cols="20" rows="5"
                placeholder="Type your Complaint/Feedback here"
                className="border"
                style={{width:"500px", padding:5}}
                value={message}
                onChange={text=> setMessage( text.target.value )}
                >
                </textarea>
                <br />
            <button className="btn btn-success" onClick={()=>{submitBtnClick()}}>Submit</button>
            </form>
        </Card>
        </div>
        <div className="col-6" >

        </div>
    </div>
    )
}
export default FeedbackForm;