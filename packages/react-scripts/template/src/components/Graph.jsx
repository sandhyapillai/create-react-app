import React, {Component} from 'react';
import '../Graph.css';


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
    componentDidMount(){
      //Animate the measure bar(inner rectangle)
      let keyframes=`@-webkit-keyframes example{
          from {width: 0px}
          to {width: ${this.props.measure/this.props.scale}px}
      }`,

      styleSheet = document.styleSheets[0];
        setTimeout(() => {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

        },0)
    }
    render(){

        return(
            <rect x="0"
                  y={this.props.height/3}
                  className="bar measure"
                  width={this.props.measure/this.props.scale}
                  height={this.props.height/3} >
                <title>{this.props.measureTooltip} :{this.props.measure}</title>
            </rect>
        )
    }
}

class TargetElement extends Component{
    render(){
        return(
                <line x1={this.props.target/this.props.scale}
                      x2={this.props.target/this.props.scale}
                      y1={this.props.height / 6}
                      y2={this.props.height* 5 / 6}
                      className="target">
                <title>{this.props.targetTooltip} :{this.props.target}</title>
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
       var barMap = this.props.ranges.map(function(val){
          return val/this.props.scale
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
                       measure={this.props.measure}
                       measureTooltip={this.props.measureTooltip}/>
               <TargetElement
                       scale={this.props.scale}
                       width={this.props.width}
                       height={this.props.height}
                       max={this.props.max}
                       target={this.props.target}
                       targetTooltip={this.props.targetTooltip}/>
               </g>
       )
    }
}


export default class Graph extends Component{
    componentWillMount(){
      //Check if data is passed in the graph else set it to empty
      if(this.props.data !==undefined){
        this.setState({
          graph:this.props.data
        })
      }
      else{
        this.setState({
          graph:[]
        })
      }

    }

    constructor(props){
        super(props);

        this.actualWidth = this.props.width || 500;
        this.height = this.props.height || 35;
        this.svgWidth = this.actualWidth - this.props.marginRight - this.props.marginLeft;


    }

    render(){
      return (
        <div>
          {

            this.state.graph.map(function(val,i){
            this.rangeArray = [];
            val["ranges"].sort().filter(function(range,i,a){
                return(
                        this.rangeArray.push(range)
                    )
             }.bind(this))

             //Get the maximum value from the range array,measure and target inorder to set the scale of graph
             this.max = Math.max(this.rangeArray.reverse()[0],val["target"],val["measure"])
             //Calculate the scale for the graph to be displayed within the svg
             this.scale = this.max/this.svgWidth;

             return (
               <div className="chart-container" key={'chart'+i} >
                   <svg style={{width:this.actualWidth+'px'}} className="bullet">
                     <g transform="translate(120 0)" >
                      <Title
                           titleText={val["title"]}
                           subTitle={val["subtitle"]} />
                      <BarElement
                          scale={this.scale}
                          max={this.max}
                          ranges={val["ranges"].reverse()}
                          width={this.svgWidth}
                          height={this.height}
                          measure={val["measure"]}
                          target={val["target"]}
                          targetTooltip={this.props.targetTooltip}
                          measureTooltip={this.props.measureTooltip}/>
                       <TickElement
                          scale={this.scale}
                          max={this.max}
                          ticks={val["ticks"]}
                          width={this.svgWidth}
                          height={this.height} />
                      </g>
                   </svg>
               </div>
              );
             }.bind(this))
          }

          </div>
        )

    }
}
