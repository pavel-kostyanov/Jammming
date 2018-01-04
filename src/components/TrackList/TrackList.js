import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render(){
      return (
        <div className="TrackList">
            {this.props.trackList.map((item) => {
              return <Track track={item}
                      key={item.id}
                      onAdd={this.props.onAdd}
                      onRemove={this.props.onRemove}
                      minus={this.props.minus}
                      />})}
        </div>
      );
    }
 }
export default TrackList;
