import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl} from  '@angular/forms';
import { SearchserviceService } from '../searchservice.service';
import { query } from '@angular/animations';
import { Subscription } from 'rxjs';


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

export class HomeComponent implements OnInit,OnDestroy {

  constructor(private searchService:SearchserviceService) { }

  ngOnInit(): void {
  }
  
  toggleMode(){
    document.body.classList.toggle('dark-theme');
    this.mode=!this.mode;
  }
  mode=false;
  searchName=new FormControl('');
  Data:any;
  videos:Array<videoType>=[];
  subscription!: Subscription;
  selectedVideo!:videoType;

  onSubmit(){
    if(this.videos.length>0){
      this.videos=[];
    }
    
    if(this.searchName.value!=null && this.searchName.value!=""){
      
      this.subscription=this.searchService.fetchResult(this.searchName.value).subscribe({
        next:(data)=>{
          
          this.Data=data;
          this.makeData();
          

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
 selectVideo(index:number){
    this.selectedVideo=this.videos[index+1].videoId;
    console.log(this.selectedVideo);
    
 }

 
 ngOnDestroy(): void {
   this.subscription.unsubscribe();
   
 }

}
