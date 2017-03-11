import { Component, Input, OnInit }  from  '@angular/core';
import { CourseTime } from './CourseTime';

@Component({
  selector: 'schedule',
  templateUrl: 'Templates/schedule.html'
})


export class ScheduleComponent implements OnInit {
  @Input()
  times: CourseTime[];

  schedule: Map<string, CourseTime[]>;
  days: string[];
  constructor(){
    this.schedule = new Map<string, CourseTime[]>();
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
                  "Saturday", "Sunday"];
  }

  ngOnInit(): void {
    console.log(this.times);
    this.arrangeSchedule();
  }

  arrangeSchedule(): void {
    this.times.forEach(function(time, index, array){
      var day = time.day.trim();
      if(this.schedule.has(day))
        this.schedule.get(day).push(time);
      else
        this.schedule.set(day, [time]);

      if(index == array.length - 1){
        this.sortSchedule();
      }
    }, this);
  }

  sortSchedule(): void {
    this.days.forEach(function(day){
      var daySched = this.schedule.get(day);
      if(daySched){
        daySched.sort(function(a:CourseTime ,b:CourseTime){
          var aTime = a.time.split(":");
          var bTime = b.time.split(":");
          var aHour = parseInt(aTime[0]);
          var bHour = parseInt(bTime[0]);
          var aMin = parseInt(aTime[1].substr(0,2));
          var bMin = parseInt(bTime[1].substr(0,2));

          if(aTime[1].substr(2) == "PM")
            aHour += 12;
          if(bTime[1].substr(2) == "PM")
            bHour += 12;

          var aDate = new Date();
          var bDate = new Date();

          aDate.setHours(aHour);
          bDate.setHours(bHour);
          aDate.setMinutes(aMin);
          bDate.setMinutes(bMin);
          aDate.setSeconds(0);
          bDate.setSeconds(0);

          console.log(aDate);
          console.log(bDate);

          return aDate>bDate ? 1 : aDate<bDate ? -1: 0;
        })
      }
    }, this)
  }

}
