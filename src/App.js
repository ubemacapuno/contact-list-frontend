import React, { useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  const [contactName, setContactName] = useState('')   //useState hook! These are STATES.
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [fact, setFact] = useState('')
  const [additional, setAdditional] = useState('')

  const [newAdditionalInfo, setNewAdditionalInfo] = useState('') //useState for updating the contact name

  const [hitlistList, setHitlistList] = useState([])

 
  
  //Call the useEffect Hook that we will use for our GET request; we will then want this object to populate our front-end page!
  useEffect(()=>{
    Axios.get('https://mern-crud-contact-list.herokuapp.com/read').then((response)=>{
      setHitlistList(response.data)      
    })
  }, []) //by using ", []", we will be calling this function ONCE

  const addToList = () => {
    // console.log([contactName] + [company] + [phone] + [email] + [position] + [fact] + [addedOnSocialMedia])
    Axios.post('https://mern-crud-contact-list.herokuapp.com/insert', {
      //We're sending this object to the backend! 
      //See how the values are equal to the states we already have listed above.
      contactName: contactName, 
      company: company, 
      phone: phone, 
      email: email, 
      position: position, 
      fact: fact, 
      additional: additional,
    })
  }

  //Create function for UPDATING the contact name (crUd)
  const updateAdditional= (id) => { //pass whatever id is inside of the element currently in the namelist map
    Axios.put("https://mern-crud-contact-list.herokuapp.com/update", {id: id, newAdditionalInfo: newAdditionalInfo})
  }

   //Create function for DELETING the contact name (cruD)
   const deleteContact= (id) => { //pass whatever id is inside of the element currently in the namelist map
    Axios.delete(`https://mern-crud-contact-list.herokuapp.com/delete/${id}`)//can't pass objects when using delete, but you CAN pass a parameter; in this case the URL.
  }



  return (
    <div className="App">
    <h1>Contact List</h1>
      <div className="inputCard">
        <label>Contact Name:</label>
        <input type="text" onChange={(event)=>{setContactName(event.target.value)} 
        //event.target.value is the value of the current input!
        }/>

        <label>Company:</label>
        <input type="text" onChange={(event)=>{setCompany(event.target.value)} 
        }/>

        <label>Phone:</label>
        <input type="text" onChange={(event)=>{setPhone(event.target.value)} 
        }/>

        <label>Email:</label>
        <input type="text" onChange={(event)=>{setEmail(event.target.value)} 
        }/>

        <label>Position:</label>
        <input type="text" onChange={(event)=>{setPosition(event.target.value)} 
        }/>

        <label>Fun Fact:</label>
        <input type="text" onChange={(event)=>{setFact(event.target.value)} 
        }/>

        <label>Additional Info:</label>
        <input type="text" onChange={(event)=>{setAdditional(event.target.value)} 
        }/>

        <button onClick={addToList}>Add to Contact List</button>
      </div>
          
      
      {/* Create a map here that will map through ALL of the objects in the database and display them in the div (className "hitList") */}
      {hitlistList.map((val, key)=>{
        return <div key={key} className="hitList">
        <h2>{val.contactName}</h2>    
        <p>Company: <span>{val.contactCompany}</span></p>
        <p>Phone: <span>{val.contactPhone}</span></p>
        <p>Email: <span>{val.contactEmail}</span></p>
        <p>Position: <span>{val.contactPosition}</span></p>
        <p>Fun Fact: <span>{val.contactFact}</span></p>
        <p>Additional: <span>{val.contactAdditional}</span></p>

        <input type="text" placeholder="Update add'l info" onChange={(event)=>{setNewAdditionalInfo(event.target.value)}
        }/>

        {/* Update button */}
        <button onClick={() => updateAdditional(val._id)}>Update add'l info</button>  {/* in mongoDB, id is shown as "._id" */}

        {/* Delete button */}
        <button className="deleteButton" onClick={() => deleteContact(val._id)}>Remove Contact</button>  {/* in mongoDB, id is shown as "._id" */}
        </div>

      })}
    </div>
  );
}

export default App;
