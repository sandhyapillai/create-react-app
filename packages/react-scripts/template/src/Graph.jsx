import React, {Component} from 'react';
import './Graph.css';

class TickElement extends Component{
    render(){
        var ticks =[],
            tickInterval = Math.floor(this.props.max/this.props.ticks), //Calculate the tickInterval based on width of graph.
            tickIncrementer=0,
            counter=0;
        while(counter <= this.props.ticks){
            ticks.push(tickIncrementer); // Gather the array of x-axis ticks on graph
            tickIncrementer += tickInterval;
            counter++;
        }
        //Get the x positions of the ticks based on the graph scale
        let newTicks = ticks.map(function(value){
           return value/this.props.scale
        }.bind(this))

        return(
               <g>
                {
                    newTicks.map((val,i)=>(
                        <g transform={"translate("+val+ " 0)"} key={'tick'+i}>
                            <line  y1={this.props.height} y2={this.props.height *7/6} className="tick"></line>
                            <text className="tick-label" dy="1em" y={(this.props.height *7/6)+10}>{ticks[i]}</text>
                        </g>
                    ))
                 }
               </g>
        )
    }
 }
class MeasureElement extends Component{
    render(){
        //Animate the measure bar(inner rectangle)
        let keyframes=`@keyframes example {
             from {width: 0px}
            to {width: ${this.props.measure/this.props.scale}px}
        }`,
        styleSheet = document.styleSheets[0];

        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        return(
            <rect x="0"
                  y={this.props.height/3}
                  className="bar measure"
                  width={this.props.measure/this.props.scale}
                  height={this.props.height/3} >
                <title>Performance Measure :{this.props.measure}</title>
            </rect>
        )
    }
}

class MarkerElement extends Component{
    render(){
        return(
                <line x1={this.props.marker/this.props.scale}
                      x2={this.props.marker/this.props.scale}
                      y1={this.props.height / 6}
                      y2={this.props.height* 5 / 6}
                      className="marker">
                <title>Comparitive Measure :{this.props.marker}</title>
                </line>
        )
    }
}

class Title extends Component{
    render(){
        return(
                <g transform="translate(-100 20)">
                    <text className="title" >{this.props.titleText}</text>
                    <text className="sub-title" dy="1em">{this.props.subTitle}</text>
                </g>
             )
    }
}

class BarElement extends Component{

    render(){

       //Get the new range based based on scale of graph
       var barMap = this.props.ranges.map(function(val,key){
            return val['value']/this.props.scale
        }.bind(this))

       return(
               <g>
               {
                   barMap.map((value,i)=>{
                       return(
                           <rect key={'bar'+i} width={value} height={this.props.height} className={'bar s'+i}></rect>
                      )

               }) }
               <MeasureElement
                       scale={this.props.scale}
                       width={this.props.width}
                       height={this.props.height}
                       max={this.props.max}
                       measure={this.props.measure}/>
               <MarkerElement
                       scale={this.props.scale}
                       width={this.props.width}
                       height={this.props.height}
                       max={this.props.max}
                       marker={this.props.marker} />
               </g>
       )
    }
}


export default class Graph extends Component{
    constructor(props){
        super(props);
        this.state={
                title:'Revenue 2016',
                subtitle:'(U.S $ in thousands)',
                ticks:5,
                ranges:[{value:200,color:'red'},
                        {value:250,color:'red'},
                        {value:300,color:'red'}],
                measure:220,
                marker:270
        }
        this.actualWidth = this.props.width
        this.svgWidth = this.actualWidth - this.props.marginRight - this.props.marginLeft;
        this.rangeArray = [];
        this.state.ranges.filter(function(val,i,a){
            return(
                    this.rangeArray.push(val['value'])
                )
        }.bind(this))
        //Get the maximum value from the range array,measure and marker inorder to set the scale of graph
        this.max = Math.max(this.rangeArray.reverse()[0],this.state.marker,this.state.measure)
        //Calculate the scale for the graph to be displayed within the svg
        this.scale = this.max/this.svgWidth;

    }
    render(){

        return(
            <div className="chart-container">
                <svg style={{width:this.props.width+'px'}} className="bullet">
                <g transform="translate(120 0)" >
                 <Title
                      titleText={this.state.title}
                      subTitle={this.state.subtitle} />
                 <BarElement
                     scale={this.scale}
                     max={this.max}
                     ranges={this.state.ranges.reverse()}
                     width={this.svgWidth}
                     height={this.props.height}
                     measure={this.state.measure}
                     marker={this.state.marker}/>
                  <TickElement
                     scale={this.scale}
                     max={this.max}
                     ticks={this.state.ticks}
                     width={this.svgWidth}
                     height={this.props.height} />
                  </g>
                </svg>
            </div>
        );
    }
}
