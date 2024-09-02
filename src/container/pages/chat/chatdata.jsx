
import face2 from "../../../assets/images/faces/2.jpg";
import face3 from "../../../assets/images/faces/3.jpg";
import face4 from "../../../assets/images/faces/4.jpg";
import face5  from "../../../assets/images/faces/5.jpg";
import face6  from "../../../assets/images/faces/6.jpg";
import face8  from "../../../assets/images/faces/8.jpg";
import face10  from "../../../assets/images/faces/10.jpg";
import face11  from "../../../assets/images/faces/11.jpg";
import face13  from "../../../assets/images/faces/13.jpg";
import face15  from "../../../assets/images/faces/15.jpg";

const readicon=<span className="chat-read-icon float-end align-middle"><i className="ri-check-double-fill"></i></span>;
const badge=<span className="badge bg-success-transparent rounded-circle float-end">2</span>;
export const chatData = [
	{
		heading: "ACTIVE CHATS",
		users: [
			{ name: "Sujika", image: face5, time: "1:32PM", message: "Need to go for lunch?" ,icon: readicon,class:"checkforactive" ,online:"online"},
			{ name: "Emiley Jackson", image: face2, time: "12:24PM", message: "Typing...",icon:badge,class:"checkforactive" ,online:"online"},
			{ name: "McGreggor", image: face10, time: "12:24PM", message: "Typing..." ,icon:readicon, class:"chat-msg-unread checkforactive" ,online:"online"},
			{ name: "Emiley Jackson", image: face8, time: "12:45PM", message: "Chat with you later,bye", icon:readicon,class:"checkforactive" ,online:"online"}
			// Add more active chats if needed
		],
	},
	{
		heading: "ALL CHATS",
		users: [
			{ name: "Andreas", image: face11, time: "11:54AM", message: "Congratulations on your new project"  ,online:"offline", class:'chat-inactive checkforactive'},
			{ name: "Melissa Sean", image: face3, time: "9:45AM", message: "Nice work,Congrats &#128079;" ,online:"offline", class:'chat-inactive checkforactive'},
			{ name: "Samantha Paul", image: face6, time: "8:31AM", message: "Great work keep it up :-)" ,online:"offline", class:'chat-inactive checkforactive'},
			{ name: "Megan Fox", image: face4, time: "7:23AM", message: "You are need to be appreaciated for what you have done,congs" ,online:"offline", class:'chat-inactive checkforactive'},
			{ name: "Nicholas Sams", image: face13, time: "10:22AM", message: "Great Project" ,online:"offline", class:'chat-inactive checkforactive'},
			{ name: "Pope Johnson", image: face15 , time: "9:10AM", message: "Hike management fixed" ,online:"offline", class:'chat-inactive checkforactive'},
			// Add more all chats if needed
		],
	},
	// Add more sections if needed
];
