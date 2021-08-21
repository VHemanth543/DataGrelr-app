import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';



export interface form {
  first_name : string,
  last_name : string,
  email : string,
  user_name : string,
  password : string,
  age : number,
  gender : string,
  storage : string,

}

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  constructor( private server : AppServiceService ) {
   
   }

   /* EMAIL VALIDATION AND OTHER VALIDATION CONTROLLER */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /* INITIALIZING THE VARIABLES */
  title = 'DataGrelr-testapp';
  first_name :string = ""; last_name : string = ""; email : string = "";
   user_name : string =""; password : string =""; comp_password : string = ""; age : number = 0;
   gender_type = ["male" , "female" , "others"];
   storage_type = ["local" , "database"]
  gender  = "";
  storage = "";

  message = "";

 
  
  
  /* VALIDATION FOR EMAIL */
  validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  /* FORM SUBMISSION */

  submit(){

    let filedata = ""
    
    if(this.first_name == "" || this.last_name == "" || this.email == "" || this.user_name == "" || this.password == "" || this.comp_password == ""){
      this.message = " Fill  All the Necessary fields with * symbol. Please fill all the necessary fields !"
    }
    else if(this.password != this.comp_password){
      this.message = " Password must match the Conform Password. Please check it."
    }
    else if(!this.email.match(this.validRegex)){
      this.message = " Please enter a valid Email Id . Ex : companynameXXXXX@gmail.com"
    }
    else if(this.age < 18){

      this.message = " Your Under age to Register for the Application"
    }
    else{
      let data : form[] = [
        {
          first_name : this.first_name,
          last_name : this.last_name,
          email : this.email,
          user_name : this.user_name,
          password : this.password,
          age : this.age,
          gender : this.gender,
          storage : this.storage
        }
      ]

      let sendData = {
        firstName : this.first_name,
        lastName : this.last_name,
        email : this.email,
        UserName : this.user_name,
        Password : this.password,
        age : this.age,
        gender : this.gender

        
      }
      
      /* STORING DATA LOCALLY */
      if(this.storage == "local"){
        let key = localStorage.length;
        key = key + 1;
        let conv = key.toString()
         localStorage.setItem(conv,JSON.stringify(data))

         console.log(JSON.stringify(data))
         
        
      }

      /* STORING DATA IN DATABASE */
      else {
        this.server.setData(sendData).subscribe((user)=>{
          if(user){
            console.log("Success Data Sent \n" + user)
          }
        } ,
        (err)=>{
          throw err;
        })
      }
      
    }

    



  }


  ngOnInit(): void {
    
  }

}
