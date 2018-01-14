import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(event){
    event.preventDefault();
    this.props.onAdd(this.props.track);
  }

  removeTrack(event){
    event.preventDefault();
    this.props.onRemove(this.props.track);
  }

  plusOrMinus() {
    if(this.props.minus){
      return <a className="Track-action" onClick = {this.removeTrack}>-</a>
    }else{
      return  <a className="Track-action" onClick = {this.addTrack}>+</a>
    }
  }

    render(){
      return (
          <div className="Track">

            <div className="Track-information">
               {this.plusOrMinus()}
               <div className="Track-name"   title={this.props.track.name}>{this.props.track.name}</div>
               <div className="Track-artist" title={this.props.track.artist}>{this.props.track.artist}</div>
               <div className="Track-album"  title={this.props.track.album}>{this.props.track.album}</div>
             </div>

          </div>
        )
     }
 }
export default Track;
