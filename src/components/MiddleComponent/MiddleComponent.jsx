import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AllDivision from './AllDivision';
class MiddleComponent extends React.Component {
    state={
        shows:{},
        england:[],
        scotland:[],
        ireland:[],
        showTextField:false,
        showList:false,
        filterOption:"",
        selectedDivision:"",
        startingDate:"",
        endingDate:"",
        startDate:"",
        endDate:"",
        filteredListEngland:[],
        filteredListScotland:[],
        filteredListIreland:[]
    }
     async componentDidMount(){
         let show= await axios.get("https://www.gov.uk/bank-holidays.json");
         this.setState({england:show.data["england-and-wales"].events,scotland:show.data["scotland"].events,ireland:show.data["northern-ireland"].events});
     }
     handleChange=(e)=>{
           if(e.target.value==="dateRange") this.setState({filterOption:e.target.value,showList:false,showTextField:true});
           if(e.target.value==="yesterday"){
            let{england,scotland,ireland}=this.state;
            const today = new Date();
            let yesterday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
            let resultEngland=england.filter(function(obj){
                return obj.date ==yesterday;
            })
            let resultScotland=scotland.filter(function(obj){
                return obj.date ==yesterday;
            })
            let resultIreland=ireland.filter(function(obj){
                return obj.date ==yesterday;
            })
            this.setState({filteredListEngland:resultEngland,filteredListScotland:resultScotland,filteredListIreland:resultIreland,showList:true,showTextField:false,startDate:"",startingDate:"",endDate:"",endingDate:""});
           }
           if(e.target.value==="lastWeek"){
            let{england,scotland,ireland}=this.state;
            const today = new Date();
            const currDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
            const lastweek = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-7);
            let resultEngland=england.filter(function(obj){
                 return obj.date >= lastweek && obj.date<= currDate;
            })
            let resultScotland=scotland.filter(function(obj){
                 return obj.date >= lastweek && obj.date<= currDate;
            })
            let resultIreland=ireland.filter(function(obj){
                 return obj.date >= lastweek && obj.date<= currDate;
            })
            this.setState({filteredListEngland:resultEngland,filteredListScotland:resultScotland,filteredListIreland:resultIreland,showList:true,showTextField:false,startDate:"",startingDate:"",endDate:"",endingDate:""});
           }
           if(e.target.value==="lastMonth"){
            let{england,scotland,ireland}=this.state;
            const today = new Date();
            const currDate=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
            const lastMonth = today.getFullYear()+'-'+today.getMonth()+'-'+(today.getDate());
            let resultEngland=england.filter(function(obj){
                 return obj.date >= lastMonth && obj.date<= currDate;
            })
            let resultScotland=scotland.filter(function(obj){
                 return obj.date >= lastMonth && obj.date<= currDate;
            })
            let resultIreland=ireland.filter(function(obj){
                 return obj.date >= lastMonth && obj.date<= currDate;
            })
            this.setState({filteredListEngland:resultEngland,filteredListScotland:resultScotland,filteredListIreland:resultIreland,showList:true,showTextField:false,startDate:"",startingDate:"",endDate:"",endingDate:""});
           }
           if(e.target.value==="") this.setState({filterOption:e.target.value,showList:false,showTextField:false})

     }
     handleStartingDate=(date)=>{
       
        let currDate=date.getDate();
        if(currDate<10) currDate="0"+currDate;
        let month=date.getMonth()+1;
        if(month<10) month="0"+month;
        let year=date.getFullYear();
        let x=year+"-"+month+"-"+currDate;
        console.log(x);
         this.setState({startingDate:date,startDate:x});
     }
     handleEndingDate=(date)=>{
        let currDate=date.getDate();
        if(currDate<10) currDate="0"+currDate;
        let month=date.getMonth()+1;
        if(month<10) month="0"+month;
        let year=date.getFullYear();
        let x=year+"-"+month+"-"+currDate;
         this.setState({endingDate:date,endDate:x});
     }
     handleSubmit=()=>{
         let {startDate,endDate,england,scotland,ireland}=this.state;
        let resultEngland=england.filter(function(obj){
            return obj.date >= startDate && obj.date<= endDate;
        })
        let resultScotland=scotland.filter(function(obj){
            return obj.date >= startDate && obj.date<= endDate;
        })
        let resultIreland=ireland.filter(function(obj){
            return obj.date >= startDate && obj.date<= endDate;
        })
        this.setState({filteredListEngland:resultEngland,filteredListScotland:resultScotland,filteredListIreland:resultIreland,showList:true,});
     }

    render() { 
        let {england,scotland,ireland,filterOption,startingDate,endingDate,filteredListEngland,filteredListScotland,filteredListIreland,showList,selectedDivision,showTextField}=this.state;
        console.log('startingDate:- ',startingDate+ 'endingDate:- ',endingDate);
        return(
        <div className="container"> 
            <div style={{    display:"grid",gridTemplateColumns: "3% 15% 37%"}}>
                <div style={{fontSize:"18px",fontWeight:"700",paddingTop:"0.3%",marginTop: "5px"}}>Filter:-</div>
                <div>
                  <select  onChange={this.handleChange}>
                    <option value="">Select Your Option</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="dateRange">Custom Date Range</option>
                  </select>
                </div>
                <div>{showTextField ?
                    <div className="range">
                        <DatePicker dateFormat="yyyy-MM-dd" selected={startingDate} onChange={(date) => this.handleStartingDate(date)}  />
                        <DatePicker dateFormat="yyyy-MM-dd" selected={endingDate} onChange={(date) => this.handleEndingDate(date)} />
                        <button className='btn-submit' onClick={this.handleSubmit}>Submit</button>
                    </div>
                :""}</div>
            </div>      
            {!showList ?<AllDivision England={england} Scotland={scotland} Ireland={ireland} />:""}
            { showList ? <AllDivision England={filteredListEngland} Scotland={filteredListScotland} Ireland={filteredListIreland}  />:""}
        </div>);
    }
}
 
export default MiddleComponent;