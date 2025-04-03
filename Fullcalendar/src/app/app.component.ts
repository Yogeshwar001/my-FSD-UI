import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/angular'
import { CommonService } from 'src/services/common.service';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from './modals/UserDetails.modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fullcalendar';
  data:any;
  name: string = '';
  userdetails:UserDetails |undefined;
  constructor(private cs:CommonService,private http:HttpClient){}

   calendarOptions: CalendarOptions = {
            headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }
   
    // initialView: 'dayGridMonth',
    // events: [
    //   {
    //     "title": "Event 1",
    //     "start": "2024-05-05T09:00:00",
    //     "end": "2024-05-05T18:00:00"
    //   },
    //   {
    //     "title": "Event 2",
    //     "start": "2024-05-08",
    //     "end": "2024-05-08"
    //   }
    // ]
 
  // events.push({
  //   "title": "Event " + index,
  //   "start": moment(result[index].timeStart).toISOString(),
  //   "end": moment(result[index].timeEnd).toISOString(),
  // });

   
  
  
  }
  ngOnInit(): void {
    
      document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new Calendar(calendarEl, {

          // events: function(info, successCallback) {
          //   let  eventsArr = [
          //       {
          //         "title": "Event 1",
          //         "start": "2024-05-05T09:00:00",
          //         "end": "2024-05-05T18:00:00"
          //       },
          //       {
          //         "title": `${this.title} | "Event 0"`,
          //         "start": "2024-05-08",
          //         "end": "2024-05-08"
          //       }
          //     ]
              
              // successCallback(eventsArr);
              
          // }
  
           events: [
      {
        "title": "Event 1",
        "start": "2024-05-05T09:00:00",
        "end": "2024-05-05T18:00:00"
      },
      {
        "title": `${this.title} | "Event 0"`,
        "start": "2024-05-08",
        "end": "2024-05-08"
      }
    ]
        })
        calendar.render()
      });
  }

  fetchServer():any{
this.cs.getCalledServer().subscribe((response)=>{
    this.data=response;
    console.log(this.data)
  
},
(error)=>{
  console.error(error);
}
)
  }
  
getName(name:string){
  this.cs.greetUser(name).subscribe(
    (response)=>{
    this.name = response;
  },
  (error)=>{
    this.name = error;
    console.error(error)
  }
)
}

getUserDetails(){
  this.cs.getUserList().subscribe((Response)=>{
    this.userdetails = Response;
    console.log("List of Users",this.userdetails)
    return this.userdetails;
  },
(error)=>{
console.error(error)
})
}

  randomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  color = this.randomColor();
}

