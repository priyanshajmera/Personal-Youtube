import { Component, OnInit } from '@angular/core';
import { FormControl} from  '@angular/forms';
import { SearchserviceService } from '../searchservice.service';
import { query } from '@angular/animations';


export interface videoType{
  videoId:any,
  thumbnailUrl:any,
  desc:any
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private searchService:SearchserviceService) { }

  ngOnInit(): void {
  }
  mode=false;
  toggleMode(){
    document.body.classList.toggle('dark-theme');
    this.mode=!this.mode;
  }

  searchName=new FormControl('');
  Data:any;
  videos:Array<videoType>=[];

  onSubmit(){
    
    if(this.searchName.value!=null && this.searchName.value!=""){
      
      this.searchService.fetchResult(this.searchName.value).subscribe({
        next:(data)=>{
          this.Data=data;
          this.makeData();
          console.log(this.videos.length);

        },
        error:err=>console.log(err)

      }
        

      )

    }
  }
 makeData(){
    this.Data.items.forEach((item: any)=> {
      
      let videoId=item.id.videoId;
      let thumbnailUrl=item.snippet.thumbnails.high.url;
      let desc=item.snippet.title;
      this.videos.push({'videoId':videoId,'thumbnailUrl':thumbnailUrl,'desc':desc});
      
      
    });
 }

}
