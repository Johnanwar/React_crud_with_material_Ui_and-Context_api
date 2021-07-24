import axios from "axios";

const BASE_URL = 'http://localhost:8088/api/'; // local host VS
// const BASE_URL = '/api/';
// const BASE_URL = 'http://150.150.150.150:8099/api/'; // abdeen iis

// const BASE_URL = 'http://192.168.0.141:8089/api/';  /// smart iis
// const BASE_URL = 'http://192.168.0.141:8090/api/';



// const header = `AccessToken  ${headerToken}` 
// const headersss = {
//    'Content-Type': 'application/json',
//      'AccessToken':headerToken
//  }

export const ENDPIONTS = {
   
   LOGIN: 'Account/Login',

   //get all departements
   DEPARTMENTS: 'Department/GetAllDepartments',
   //get employeees
   EMPLOYEES: 'Employee/GetEmployee',
   //get employeees from form 2
   EMPLOYEES2: 'Employee/GetEmployeeForm2',
   //get employeees  from form 3
   EMPLOYEES3: 'Employee/GetEmployeeForm3',
   //get employeees  from form 4
   EMPLOYEES4: 'Employee/GetEmployeeForm4',
    //get employeees  from form 5
    EMPLOYEES5: 'Employee/GetEmployeeForm5',
    //get employeees  from form 5 issue
    EMPLOYEES5Issue: 'Employee/GetEmployeeForm5Issues',
     //get employeees  from form 6 get prison
   EMPLOYEES6: 'Employee/GetEmployeeForm6',
     //get employeees  from form 7ationality
   EMPLOYEES7: 'Employee/GetEmployeeForm7',
       //get employeees  from form 7ationality
   EMPLOYEES8: 'Employee/GetEmployeeForm8',
       //get employeees  from form 7ationality
   EMPLOYEES9: 'Employee/GetEmployeeForm9',
   //get employeees  from form 7ationality
   EMPLOYEES10: 'Employee/GetEmployeeForm10',
   //get employeees  from form 7ationality
   EMPLOYEES11: 'Employee/GetEmployeeForm11',
   //get employeees  from form 7ationality
   EMPLOYEES12: 'Employee/GetEmployeeForm12',
   //get employeees  from form 7ationality
   EMPLOYEES13: 'Employee/GetEmployeeForm13',
   //get employeees  from form 7ationality
   EMPLOYEES14: 'Employee/GetEmployeeForm14',
   //get employeees  from form 7ationality
   EMPLOYEES15: 'Employee/GetEmployeeForm15',
   //get employeees  from form 7ationality
   EMPLOYEES16: 'Employee/GetEmployeeForm16',
   //get employeees  from form 7ationality
   EMPLOYEES17: 'Employee/GetEmployeeForm17',
   //get employeees  from form 7ationality
   EMPLOYEES18: 'Employee/GetEmployeeForm18',
   //get employeees  from form 7ationality
   EMPLOYEES19: 'Employee/GetEmployeeForm19',
   //get employeees  from form 7ationality
   EMPLOYEES20: 'Employee/GetEmployeeForm20',
   //get employeees  from form 7ationality
   EMPLOYEES21: 'Employee/GetEmployeeForm21',
   //get employeees  from form 7ationality
   EMPLOYEES22: 'Employee/GetEmployeeForm22',

   //get employeees  from form 7ationality
   
   EMPLOYEES23: 'Employee/GetEmployeeForm23',
    //get employeees  from form 7ationality
   EMPLOYEES24: 'Employee/GetEmployeeForm24',
    //get employeees  from form 7ationality
   EMPLOYEES25: 'Employee/GetEmployeeForm25',
  //get employeees  from form 7ationality
   EMPLOYEES26: 'Employee/GetEmployeeForm26',
   //get employeees  from form 7ationality
   EMPLOYEES27: 'Employee/GetEmployeeForm27',
     //get employeees  from form 7ationality
   EMPLOYEES28: 'Employee/GetEmployeeForm28',
       //get employeees  from form  29 president
   EMPLOYEES29: 'Employee/GetEmployeeForm29',
   //get employeees  from form 30 global
   EMPLOYEES30: 'Employee/GetEmployeeForm30',
      //get employeees  from form 30 global
   EMPLOYEES31: 'Employee/GetEmployeeForm31',



   //add employees data form 1
   POSTEMPLOYEES:'Employee/AddEmployeeDetailsForm1',
   //add employees data form 2
   POSTEMPLOYEES2:'Employee/AddEmployeeDetailsForm2',
   //add employees data form 3
   POSTEMPLOYEES3:'Employee/AddEmployeeDetailsForm3', 
    //add employees data form 4
   POSTEMPLOYEES4:'Employee/AddEmployeeDetailsForm4',
     //add employees data form 5
   POSTEMPLOYEES5:'Employee/AddEmployeeDetailsForm5',
         //add employees data form 5
   POSTEMPLOYEES5Issue:'Employee/AddEmployeeDetailsForm5Issues',
     //add employees data form 6 get prison
   POSTEMPLOYEES6:'Employee/AddEmployeeDetailsForm6',
       //add employees data form 7 nationality
  POSTEMPLOYEES7:'Employee/AddEmployeeDetailsForm7',
  //add employees data form 30 global
  POSTEMPLOYEES8:'Employee/AddEmployeeDetailsForm8',
     //add employees data form 30 global
 POSTEMPLOYEES9:'Employee/AddEmployeeDetailsForm9',
        //add employees data form 30 global
  POSTEMPLOYEES10:'Employee/AddEmployeeDetailsForm10',
     //add employees data form 30 global
 POSTEMPLOYEES11:'Employee/AddEmployeeDetailsForm11',
        //add employees data form 30 global
  POSTEMPLOYEES12:'Employee/AddEmployeeDetailsForm12',
     //add employees data form 30 global
     POSTEMPLOYEES13:'Employee/AddEmployeeDetailsForm13',
        //add employees data form 30 global
  POSTEMPLOYEES14:'Employee/AddEmployeeDetailsForm14',
     //add employees data form 30 global
     POSTEMPLOYEES15:'Employee/AddEmployeeDetailsForm15',
        //add employees data form 30 global
  POSTEMPLOYEES16:'Employee/AddEmployeeDetailsForm16',
     //add employees data form 30 global
     POSTEMPLOYEES17:'Employee/AddEmployeeDetailsForm17',
        //add employees data form 30 global
  POSTEMPLOYEES18:'Employee/AddEmployeeDetailsForm18',
     //add employees data form 30 global
     POSTEMPLOYEES19:'Employee/AddEmployeeDetailsForm19',
        //add employees data form 30 global
  POSTEMPLOYEES20:'Employee/AddEmployeeDetailsForm20',

      //add employees data form 29 president
      POSTEMPLOYEES21:'Employee/AddEmployeeDetailsForm21',
        //add employees data form 7 religion

       POSTEMPLOYEES22:'Employee/AddEmployeeDetailsForm22',
       //add employees data form 30 global
       POSTEMPLOYEES23:'Employee/AddEmployeeDetailsForm23',
       //add employees data form 30 global
       POSTEMPLOYEES24:'Employee/AddEmployeeDetailsForm24',
       //add employees data form 30 global
       POSTEMPLOYEES25:'Employee/AddEmployeeDetailsForm25',
       //add employees data form 30 global
       POSTEMPLOYEES26:'Employee/AddEmployeeDetailsForm26',
       //add employees data form 30 global
       POSTEMPLOYEES27:'Employee/AddEmployeeDetailsForm27',
       POSTEMPLOYEES28:'Employee/AddEmployeeDetailsForm28',
       //add employees data form 30 global
       POSTEMPLOYEES29:'Employee/AddEmployeeDetailsForm29',
       //add employees data form 30 global
         POSTEMPLOYEES30:'Employee/AddEmployeeDetailsForm30',
         //add employees data form 30 global
         POSTEMPLOYEES31:'Employee/AddEmployeeDetailsForm31',

         // delete methods
         DELETEEMPLOYEES5 :'Employee/DeleteForm5ByID',
         DELETEEMPLOYEES6 :'Employee/DeleteForm6ByID',
         DELETEEMPLOYEES7 :'Employee/DeleteForm7ByID',
         DELETEEMPLOYEES8 :'Employee/DeleteForm8ByID',
         DELETEEMPLOYEES9 :'Employee/DeleteForm9ByID',
         DELETEEMPLOYEES10 :'Employee/DeleteForm10ByID',

         DELETEEMPLOYEES11 :'Employee/DeleteForm11ByID',
         DELETEEMPLOYEES12 :'Employee/DeleteForm12ByID',
         DELETEEMPLOYEES13 :'Employee/DeleteForm13ByID',
         DELETEEMPLOYEES14 :'Employee/DeleteForm14ByID',
         DELETEEMPLOYEES15 :'Employee/DeleteForm15ByID',
         DELETEEMPLOYEES16 :'Employee/DeleteForm16ByID',
         DELETEEMPLOYEES17 :'Employee/DeleteForm17ByID',
         DELETEEMPLOYEES18 :'Employee/DeleteForm18ByID',
         DELETEEMPLOYEES19 :'Employee/DeleteForm19ByID',
         DELETEEMPLOYEES20 :'Employee/DeleteForm20ByID',
         DELETEEMPLOYEES21 :'Employee/DeleteForm21ByID',
         DELETEEMPLOYEES22 :'Employee/DeleteForm22ByID',
         DELETEEMPLOYEES23 :'Employee/DeleteForm23ByID',
         DELETEEMPLOYEES24 :'Employee/DeleteForm24ByID',
         DELETEEMPLOYEES25 :'Employee/DeleteForm25ByID',
         DELETEEMPLOYEES26 :'Employee/DeleteForm26ByID',
         DELETEEMPLOYEES27 :'Employee/DeleteForm27ByID',
         DELETEEMPLOYEES28 :'Employee/DeleteForm28ByID',
         DELETEEMPLOYEES29 :'Employee/DeleteForm29ByID',
         DELETEEMPLOYEES30 :'Employee/DeleteForm30ByID',
         DELETEEMPLOYEES31 :'Employee/DeleteForm31ByID',
        // Employee/GetEmployeeReport
         ENTRYREPORT:"Employee/GetEmployeeReport",
         /// user logs
         LOGS :"/User/SaveUserLogs", 

}
export const createAPIEndpoint = endpoint => {
   

const headerToken  = localStorage.getItem('AccessToken');

   // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
   // axios.defaults.headers.common['AccessToken'] = header
    let url = BASE_URL + endpoint + '/';
    return {
        fetchAll: () => axios.get(url ,  
         
         { 
            headers: {
         'AccessToken': headerToken
         } 
       }
         ),
        fetchById: id => axios.get(url + id),
        fetchByIdAndYear: (id , item )  => axios.get(url + id + '/' + item  ,
         { 
            headers: {
         'AccessToken': headerToken
         } 
       }
         ),
        // post new record
        create: newRecord => axios.post(url, newRecord ,
         { 
            headers: {
           'AccessToken': headerToken
           } 
         }
          ),
            // get new report
          createReport: newRecord => axios.get(url, newRecord ,
            { 
               headers: {
              'AccessToken': headerToken
              } 
            }
             ),
      //   post data to form 6 GetPrison
        createPrison:  (id , item , newRecord)  => axios.post(url + id + '/' + item, newRecord ,
        { 
         headers: {
        'AccessToken': headerToken
        } 
        } 
        ),
      //   update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: (id , objId) => axios.delete(url + id + '/' + objId , 
        { 
         headers: {
      'AccessToken': headerToken
      } 
    }
        )
    }
}