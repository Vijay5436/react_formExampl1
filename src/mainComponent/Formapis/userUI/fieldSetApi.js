import React, { Component } from 'react';
import {config} from '../constants/formFilds';
import {Button} from 'react-bootstrap';
import update from 'immutability-helper'

export default class Formfield extends Component {
    constructor(props) {
        super(props);
        this.state={
            formfieldData:config,
            showdata:false,
        }
    }
    inputChange=(e,I1,I2)=>{
        const list = [...this.state.formfieldData];

        //by immutability-helper

       const newlist = update(list,{[I1]:{field:{[I2]:{value:{$set:e.target.value}}}}})

    //BY map

    //     const uparray= list.map((element,index1)=>{
    //         var field=element.field.map((obj,index2)=>{
    //            if(I2===index2 && I1 ===index1) {
    //                return{...obj,value:e.target.value}
    //            } else{
    //                return obj
    //            }
    //         })
    //         return{field}     
    //    })
    //    console.log(uparray,'field')

    //By forEach
        // list.forEach((element,index1)=>{
        //     element.field.forEach((obj,index2)=>{
        //         if(I1===index1 && I2 === index2) {
        //             obj.value =e.target.value
        //         } 
        //     })
            
        // })
       this.setState({formfieldData:newlist})

    }
    showdataClick=()=>{
        this.setState(prestate=>({
            showdata:!prestate.showdata,
        }))
    }
    addfieldclick=()=>{
        let array=this.state.formfieldData;
        let arrayLength=array.length;
        this.addToArray(arrayLength+1)
    }
    removefieldclick=(index)=>{
        const list = [...this.state.formfieldData];
        list.splice(index,1);
        this.setState({formfieldData:list})

    }
    addToArray=(value)=>{
        let array=this.state.formfieldData;
                array.push({  
                    field: [
                        {label:"Field " , type:"text" , value:"Add tittle",id:`field_${value}`},
                        {label:"Value " , type:"text" , value:"add value",id:`value_${value}`},
                         ]
                })
        this.setState({formfieldData:array})
    }
   
    render() {
        const im = [{"name":"vij","age":23,"place":"akp"},{"name":"aij","age":23,"place":"akp"},{"name":"bala","age":23,"place":"akp"}];
        const cd = im.filter((e)=> 
            e.name === "vij" && e  
         );
        console.log('im',im)

        console.log(JSON.stringify(cd[0]) ,'cd');
        const {formfieldData,showdata} =this.state;
        const showElements=[]
        if(showdata) {
            
            let list=this.state.formfieldData;
            let jsonObject ={};   
                list.forEach(ele=>{
                    let keyValue =ele.field[0].value;
                    let Value =ele.field[1].value;
                    let obj ={ [keyValue] : Value }            
                    jsonObject={...jsonObject,...obj};
                })
                showElements.push(
                    JSON.stringify(jsonObject)
                )
        }
       
        return (
            <>
                <div className='formcontainer' key='401'>
                    {formfieldData.map((e,i1)=>(
                        <>
                           { e.field.map((obj,i2)=>(
                                    <>
                                        <lable key={i1} >{obj.label}</lable>
                                        <input key={i1+10} type='text' 
                                            onChange={(event)=>this.inputChange(event,i1,i2)}
                                            value={ obj.value} >
                                        </input>
                                    </>    
                            ))}
                             <>
                                {formfieldData.length !== 1 && 
                                    <button key={i1+1} 
                                        onClick={()=>this.removefieldclick(i1)}
                                    >
                                        <i className="fa fa-minus"></i>
                                    </button>
                                }
                                {formfieldData.length-1 === i1 &&  
                                    <button key={i1+2} 
                                        onClick={()=>this.addfieldclick(formfieldData.length)}
                                    >
                                        <i className="fa fa-plus"></i> 
                                    </button>}<br></br>
                            </>
                        </> 
                        ))}
                        <hr></hr>
                </div>
                <br></br>
                <div id='showbtn'>
                    <Button  
                        key='102'
                        className='btn' 
                        onClick={this.showdataClick.bind(this)}
                        >{showdata ? 'Hide Data' : 'Show Data'}
                    </Button><br></br>
                    <span>{showElements}</span>
                </div>
            </>
        )
    }
}