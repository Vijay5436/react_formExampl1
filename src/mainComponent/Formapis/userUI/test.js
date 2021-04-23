import React, { Component } from 'react';
import {Form , Button } from "react-bootstrap";
import {intialState} from "./config"

class FormPopulation extends Component {

    constructor(props){
        super(props);
        this.state={
            config:intialState,
            stringData:"",
            showData:false
        }
    }

    handleValueChange=( event,labelParameter )=>{        
        let newInput = event.target.value;
        let temp=this.state.config;
       
        let updatedArray= temp.map(element=>{
        
            const field=element.field.map(value =>{

                if(value.label === labelParameter){
                    return {...value,value:newInput}
                }
                else{
                    return value;
                }
            })
            return{field}
        })
        this.setState({
            config:updatedArray
        },()=>this.checkShowData())
    }

    showData =()=> {             
        let temp=this.state.config;
        let needed ={};
        let temp2 =temp.map(element=>{        
            return element.field            
        });
        for(let i in temp2){
            let j=0,k=1;
            let firstValue =temp2[i][j].value;
            let secondValue =temp2[i][k].value;
            let obj ={ [firstValue] : secondValue }            
            needed={...needed,...obj};
        }    
        let neededString =JSON.stringify(needed);
        this.setState({
            stringData:neededString,
            showData:true
        })
    }

    removeData =()=>{
        this.setState({
            stringData:"",
            showData:false
        })
    }

    removeFromJson = (e,json) =>{ 
        let jsonToRemove = JSON.parse(json);
        let temp = this.state.config;
        let needed = temp.filter(value => value.field[0].label !== jsonToRemove.field[0].label )
        this.setState({
            config : needed
        },()=>this.checkShowData())               
    }

    checkShowData =()=>{
        if(this.state.showData){
            this.removeData();
            this.showData();
        }
    }

    addJson = () =>{
        let temp = this.state.config;
        let tempLength = (temp.length) + 1;
        // eslint-disable-next-line
        let label1 = "Field"+" "+`${tempLength}`;
        // eslint-disable-next-line
        let label2 = "value"+" "+`${tempLength}`;
        let newObj ={
            field: [
                {label:`${label1}` , type:"text" , value:""},
                {label:`${label2}` , type:"text" , value:""},
            ]
        }
        this.setState((prev,props) =>({
            config: prev.config.concat(newObj)
        }))
    }

render() {
    const { config } = this.state;
    const populationForm =[];
    const showRemoveButton =[];
    let data;

    if(this.state.stringData !==""){
        data=this.state.stringData
    }

    if(this.state.showData){
        showRemoveButton.push(
            <Button variant="primary" key="less" 
                onClick={this.removeData}>Hide data
            </Button>
        )
    }
    
    else{
        showRemoveButton.push(
            <Button variant="primary" key="more" 
                onClick={this.showData}>Show data
            </Button>
        )
    }

    if(config.length){
        config.forEach(value=>{
        let temp=[];
        value.field.forEach( value =>{
            temp.push(
                <React.Fragment>
                    {"  "}<label >{value.label + " :"}</label>{"  "}
                    <input type="text"
                        onChange={(event)=>this.handleValueChange(event,value.label)}
                        value={value.value}
                    ></input>
                </React.Fragment>
            )
        })    
    
        if(temp.length){
            let parameter = JSON.stringify(value);
            populationForm.push(
                <Form.Group >
                    {temp}
                    <Button variant="danger" className="right" 
                        onClick={(e)=>this.removeFromJson(e,parameter)}>-
                    </Button>
                </Form.Group>
            )
        }
    })
    }

    return (
    <div className="form">
        {populationForm}
        <Button variant="primary" onClick={()=>this.addJson()} 
            className="right">+
        </Button><br /><br />
        {showRemoveButton}
        <div >{data}</div>
    </div>
    );}
    
}

export default FormPopulation;

